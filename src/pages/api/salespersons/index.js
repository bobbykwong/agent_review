import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {
  const db = await mongo.connect();
  const queryParams = req.query;
  const page = queryParams["page"] ? parseInt(queryParams["page"]) : 0;
  const limit = queryParams["limit"] ? parseInt(queryParams["limit"]) : 10;
  const skippedDocs = page * limit

  if (queryParams["sortby"] == "sortTest"){
    const salespersonsTest = await db.collection("salespersons")
                                    .aggregate([
                                    {$lookup:
                                      {
                                        from: "transactions",
                                        localField: "id",
                                        foreignField: "salespersonId",
                                        // pipeline: [
                                        //   {$count: "totalTransactions"},
                                          // {$sort: {"transactions": 1}}
                                          // {$sortByCount: {"transactions.totalTransactions": 1}}
                                        // ],
                                        as: "transactions"
                                      }
                                    },
                                    {
                                      $project: {
                                        // id: 1,
                                        // name: 1,
                                        // registrationNum: 1,
                                        // registrationStartDate: 1,
                                        // registrationEndDate: 1,
                                        // estateAgentName: 1,
                                        // estateAgentLicenseNum: 1,
                                        numOfTransactions: { $size: "$transactions" }
                                      }
                                    },
                                    {
                                      $sort: {numOfTransactions: -1}
                                    }
                                    // {$sort:
                                    //   {
                                    //     "transactions.totalTransactions": 1
                                    //   }
                                    // }
                                    // {$unwind: "$transactions"},
                                    // {$sortByCount: "$transactions"}
                                    // {$group: 
                                    //   {
                                    //     _id: "$transactions.totalTransactions"
                                    //   }
                                    // },
                                    // {$sort: {count: 1}}
                                    // {$match: 
                                    //   {town: "BUKIT PANJANG"}
                                    // },
                                    // {$count: "total transactions"}
                                    // {$group: 
                                    //     {
                                    //         _id: "$salespersonId", 
                                    //         count:{$sum:1}
                                    //     }
                                    // }                 
                                  ])
                                  // .sort({"numOfTransactions" : -1})
                                  .limit(10)
                                  .toArray();
    res.status(200).send(salespersonsTest); 
  }
    

  // Get the filter key and value from the params
  // Only expecting one filter key. Doesn't seem to make sense to query more than one field.
  let filterKey = "";
  const filterParams = {};

  Object.keys(queryParams).forEach((element) => {
    if (element == "name"){
      filterKey = element;
      const filterValue = queryParams[filterKey];
      
      // Regex operator searches value WHERE includes string.
      //  Option 'i' for case insensitivity
      filterParams["name"] = {$regex: filterValue, $options: 'i'}
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
  const salespersons = await db
    .collection("salespersons")
    .find(filterParams)
    // skip pagination may not be the best way as its performance decreases the further it skips. See range queries
    .sort(sortParams)
    .skip(skippedDocs)
    .limit(limit)
    .toArray();

  const jsonResponse = {
    pageToken: page,
    totalResults: 1000,
    results: salespersons,
  };

  res.status(200).json(jsonResponse);
}
