import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {

    const db = await mongo.connect();
    const queryParams = req.query

    // Filter by estate agent
    if (queryParams["estateAgentName"])
    {
      const estateAgentName = queryParams["estateAgentName"]
      const salespersons = await db.collection("salespersons").find({estateAgentName}).limit(10).toArray()
      res.status(200).json(salespersons);
    }
    const salespersons = await db.collection("salespersons").find({}).limit(10).toArray();
    res.status(200).json(salespersons);

}