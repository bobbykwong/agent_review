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
  const filterParams = {};
  const setFilterParams = (key) => {
    filterValue = queryParams[key];
    filterParams[key] = filterValue;
  }

  Object.keys(queryParams).forEach((element) => {    
    switch (element) {
      case "name":
        filterValue = queryParams[element];
        filterParams["name"] = { $regex: filterValue, $options: "i" };
        break;
      case "registrationNum":
        setFilterParams(element)
        break;
      case "registrationStartDate":
        setFilterParams(element)
        break;
      case "registrationEndDate":
        setFilterParams(element)
        break;
      case "estateAgentName":
        setFilterParams(element)
        break;
      case "estateAgentLicenseNum":
        setFilterParams(element)
        break;
      case "ratings":
        setFilterParams(element)
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
  }

  // Query Mongo
  const salespersons =
    queryParams["sortby"] === "numTransactions_desc"
      ? await db
          .collection("salespersons")
          .aggregate([
            {
              $lookup: {
                from: "transactions",
                localField: "id",
                foreignField: "salespersonId",
                as: "transactions",
              },
            },
            { $addFields: { numTransactions: { $size: "$transactions" } } },
            {
              $sort: { numTransactions: -1 },
            },
          ])
          .skip(skippedDocs)
          .limit(limit)
          .toArray()
      : await db
          .collection("salespersons")
          .find(filterParams)
          // skip pagination may not be the best way as its performance decreases the further it skips. See range queries
          .sort(sortParams)
          .skip(skippedDocs)
          .limit(limit)
          .toArray();

  const { totalResults } = await db
    .collection("salespersons")
    .aggregate([{ $match: filterParams }, { $count: "totalResults" }])
    .next();

  const jsonResponse = {
    pageToken: page,
    totalResults,
    results: salespersons,
  };

  res.status(200).json(jsonResponse);
}
