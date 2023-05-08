import type { NextApiRequest, NextApiResponse } from "next";

import { mongo } from "@/utils/mongo";
import { User } from "@/features/users";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as User["id"];

  try {
    const db = await mongo.connect();
    const users = db.collection("users");

    const user = await users.findOne({ id });

    if (!user) {
      return res.status(404).json("User not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
