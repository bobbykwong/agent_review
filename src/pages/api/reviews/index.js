import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {
    const db = await mongo.connect();
    const queryParams = req.query;
    
    const salespersonId = queryParams["salespersonId"]
    
    const filterParams = {}
    if(salespersonId)
    {
        filterParams["salespersonId"] = salespersonId
    }

    const reviews = await db.collection("reviews")
                                  .find(filterParams)
                                  .toArray();

    res.status(200).send(reviews);                                
}