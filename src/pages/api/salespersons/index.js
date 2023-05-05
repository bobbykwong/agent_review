import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {

    const db = await mongo.connect();
    const queryParams = req.query
    let page = parseInt(queryParams["page"])
    
    // Filter
    if (Object.keys(queryParams).length > 1)
    {
      // Get the filter key and value from the params
      // Only expecting one key other than pagination key. Doesn't seem to make sense to query more than one field.
      
      let filterKey;
      Object.keys(queryParams).forEach(element => {
        if (element != "page")
        {
          filterKey = element
        }
      });
              
      const filterValue = queryParams[filterKey];
      const filterParams = {}
      filterParams[filterKey] = filterValue

      // Query Mongo
      const salespersons = await db.collection("salespersons")
                                  .find(filterParams)
                                  // skip pagination may not be the best way as its performance decreases the further it skips. See range queries
                                  .skip(page)  
                                  .limit(10)
                                  .toArray()
                                  
      res.status(200).send(salespersons);
    }
    else
    {
      const salespersons = await db.collection("salespersons")
                                  .find({})
                                  .skip(page)
                                  .limit(10)
                                  .toArray();
      res.status(200).send(salespersons);
    }
}