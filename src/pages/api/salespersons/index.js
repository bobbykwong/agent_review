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
  let filterKey;
  const filterParams = {};
  const setFilterParams = (key) => {
    filterKey = key;
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

  try {
    // Query Mongo
    const salespersons = await db
      .collection("salespersons")
      .aggregate([
        {
          $match: filterParams,
        },
        {
          $project: {
            id: 1,
            name: 1,
            photoURL: 1,
            rating: 1,
            registrationNum: 1,
            registrationStartDate: 1,
            registrationEndDate: 1,
            estateAgentName: 1,
            estateAgentLicenseNum: 1,
            numTransactions: { $size: "$transactions" },
            numReviews: 1,
          },
        },
        { $sort: sortParams },
      ])
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
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
