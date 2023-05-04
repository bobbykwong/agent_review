import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {

    const db = await mongo.connect();
    const queryParams = req.query

    // Filter
    if (Object.keys(queryParams).length > 0)
    {
      // Get the filter key and value from the params
      // Only able to query one field at a time. Doesn't seem to make sense to query more than one
      const filterKey = Object.keys(queryParams)[0];
      const filterValue = Object.values(queryParams)[0];
      const filterParams = {}
      filterParams[filterKey] = filterValue

      // Query Mongo
      const salespersons = await db.collection("salespersons").find(filterParams).limit(10).toArray()
      res.status(200).json(salespersons);
    }
    else
    {
      const salespersons = await db.collection("salespersons").find({}).limit(10).toArray();
      res.status(200).json(salespersons);
    }
}