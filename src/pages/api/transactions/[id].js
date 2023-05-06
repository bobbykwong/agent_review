import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {
    const db = await mongo.connect();
    const queryParams = req.query;
    const transactionId = req.query["id"]
    // const page = parseInt(queryParams["page"]);

    const transactions = await db.collection("transactions")
                                  .find({"id": transactionId})
                                  .toArray();

    res.status(200).send(transactions);                                
}