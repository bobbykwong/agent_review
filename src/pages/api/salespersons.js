import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {
    const db = await mongo.connect();
    const salespersons = await db.collection("salespersons").find({}).limit(10).toArray();

    res.status(200).json(salespersons);
  }