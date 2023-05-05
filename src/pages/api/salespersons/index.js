import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {

    const db = await mongo.connect();
    const queryParams = req.query
    const page = parseInt(queryParams["page"])
    
    // Get the filter key and value from the params
    // Only expecting one filter key. Doesn't seem to make sense to query more than one field.
    let filterKey = "";
    Object.keys(queryParams).forEach(element => {
      switch (element) {
        case "name":
          filterKey = element
          break;
        case "registrationNum":
          filterKey = element
          break;
        case "registrationStartDate":
          filterKey = element
          break;
        case "registrationEndDate":
          filterKey = element
          break;
        case "estateAgentName":
          filterKey = element
          break;
        case "estateAgentLicenseNum":
          filterKey = element
          break;
        case "ratings":
          filterKey = element
          break;
        default:
          break;
      }
    });
    const filterValue = queryParams[filterKey];
    const filterParams = {}
    filterParams[filterKey] = filterValue
    

    // sort
    const sortQueryParams = queryParams["sortby"]
    const sortParamsArray = sortQueryParams.split("_")
    const sortParams = {}
    // if desc, value = -1, else value = 1
    sortParams[sortParamsArray[0]] = (sortParamsArray[1] == "desc")? -1 : 1

    // Query Mongo
    const salespersons = await db.collection("salespersons")
                                .find(filterParams)
                                // skip pagination may not be the best way as its performance decreases the further it skips. See range queries
                                .sort(sortParams)
                                .skip(page)  
                                .limit(10)
                                .toArray()
                                
    res.status(200).send(salespersons);

}