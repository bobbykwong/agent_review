import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {
    const db = await mongo.connect();
    const queryParams = req.query
    const page = parseInt(queryParams["page"]);
    const salespersonId = queryParams["salespersonId"]
    let transactions;
    
    // Give all transactions
    if (!salespersonId)
    {
        transactions = await db.collection("transactions")
                                  .find({})
                                  .skip(page)
                                  .limit(10)
                                  .toArray();
    }
    else{
        transactions = await db.collection("transactions")
                                      .find({"salespersonId": salespersonId})
                                      .skip(page)
                                      .limit(10)
                                      .toArray();
    }

    res.status(200).send(transactions);                                
}