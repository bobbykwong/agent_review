import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {
  const db = await mongo.connect();
  const queryParams = req.query;
  const page = queryParams["page"] ? parseInt(queryParams["page"]) : 0;
  const limit = queryParams["limit"] ? parseInt(queryParams["limit"]) : 10;
  const skippedDocs = page * limit;

  // Get the filter key and value from the params
  // Only expecting one filter key. Doesn't seem to make sense to query more than one field.
  let filterValue = "";
  let filterKey
  const filterParams = {};
  const setFilterParams = (key) => {
    filterKey = key
    filterValue = queryParams[filterKey];
    filterParams[filterKey] = filterValue;
  };

  Object.keys(queryParams).forEach((element) => {
    switch (element) {
      case "name":
        filterValue = queryParams[element];
        filterParams["name"] = { $regex: filterValue, $options: "i" };
        break;
      case "registrationNum":
        setFilterParams(element);
        break;
      case "registrationStartDate":
        setFilterParams(element);
        break;
      case "registrationEndDate":
        setFilterParams(element);
        break;
      case "estateAgentName":
        setFilterParams(element);
        break;
      case "estateAgentLicenseNum":
        setFilterParams(element);
        break;
      case "rating":
        setFilterParams(element);
        break;
      default:
        break;
    }
  });

  // sort
  const sortParams = {};
  const sortQueryParams = queryParams["sortby"];
  if (sortQueryParams) {
    const sortParamsArray = sortQueryParams.split("_");
    // if desc, value = -1, else value = 1
    sortParams[sortParamsArray[0]] = sortParamsArray[1] == "desc" ? -1 : 1;

    // Adding id in sort for sort consistetncy
    sortParams["_id"] = 1;
  } else {
    sortParams["_id"] = 1;
  }

  // Query Mongo
  const salespersons =
    queryParams["sortby"] === "numTransactions_desc"
      ? // for sort by transactions, efficiency increased when transactions are sorted first before joining with salespersons
        await db
          .collection("transactions")
          .aggregate([
            {
              $group: {
                _id: "$salespersonId",
                numTransactions: { $count: {} },
              },
            },
            { $sort: { numTransactions: -1 } },
            {
              $lookup: {
                from: "salespersons",
                let: {salespersonId: "$_id"},
                pipeline: [
                  {
                    "$match": 
                    {
                      "$expr":
                      {
                        "$and":
                        [
                          {"$eq": ["$id", "$$salespersonId"]},
                          {"$eq": [`$${filterKey}`, `${filterValue}`]}
                        ]
                      }
                    }
                  },
                  {
                    $lookup: {
                      from: "reviews",
                      let: {salespersonId: "$id"},
                      pipeline: [
                        { "$match": 
                          { "$expr":
                            {"$eq": ["$salespersonId", "$$salespersonId"]}
                          }
                        }
                      ],
                      as: "reviews"
                    }
                  },
                ],
                as: "salespersons",
              }
            },
            { $unwind: { path: "$salespersons" } },
            {
              $project: {
                id: "$_id",
                photoURL: "$salespersons.photoURL",
                rating: "$salespersons.rating",
                name: "$salespersons.name",
                registrationNum: "$salespersons.registrationNum",
                registrationStartDate: "$salespersons.registrationStartDate",
                registrationEndDate: "$salespersons.registrationEndDate",
                estateAgentName: "$salespersons.estateAgentName",
                estateAgentLicenseNum: "$salespersons.estateAgentLicenseNum",
                numTransactions: 1,
                numReviews: { $size: "$salespersons.reviews" },
              },
            },
          ])
          .skip(skippedDocs)
          .limit(limit)
          .toArray()
      : await db
          .collection("salespersons")
          .aggregate([
            {
              $match: filterParams,
            },
            { $sort: sortParams },
            {
              $lookup: {
                from: "transactions",
                localField: "id",
                foreignField: "salespersonId",
                as: "transactions",
              },
            },
            {
              $lookup: {
                from: "reviews",
                localField: "id",
                foreignField: "salespersonId",
                as: "reviews"
              }
            },  
            {
              $project: {
                id: 1,
                photoURL: 1,
                rating: 1,
                name: 1,
                registrationNum: 1,
                registrationStartDate: 1,
                registrationEndDate: 1,
                estateAgentName: 1,
                estateAgentLicenseNum: 1,
                numTransactions: { $size: "$transactions" },
                numReviews: { $size: "$reviews" },
              },
            },
          ])
          // skip pagination may not be the best way as its performance decreases the further it skips. See range queries
          .skip(skippedDocs)
          .limit(limit)
          .toArray();

  let totalResults = await db
    .collection("salespersons")
    .countDocuments(filterParams);

  const jsonResponse = {
    pageToken: page,
    totalResults: totalResults,
    results: salespersons,
  };

  res.status(200).json(jsonResponse);
}