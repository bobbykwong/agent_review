import type { NextApiRequest, NextApiResponse } from "next";

import { mongo } from "@/utils/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const db = await mongo.connect();
    const users = db.collection("users");

    const { insertedId } = await users.insertOne(req.body);

    res.status(200).json({ userId: insertedId.toString() });
  }
}
