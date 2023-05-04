import type { NextApiRequest, NextApiResponse } from "next";

import { mongo } from "@/utils/mongo";
import { jwt } from "@/utils/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const db = await mongo.connect();
    const users = db.collection("users");

    const result = await users.insertOne(req.body);
    const userId = result.insertedId.toString();

    const token = jwt.sign({ userId });

    res.setHeader("Set-Cookie", `access_token=${token}; Path=/; HttpOnly`);
    res.status(200).json({ userId });
  }
}
