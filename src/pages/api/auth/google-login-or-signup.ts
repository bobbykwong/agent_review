import type { NextApiRequest, NextApiResponse } from "next";

import { mongo } from "@/utils/mongo";
import { jwt } from "@/utils/jwt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { googleIdToken } = req.body;

    try {
      await jwt.verifyGoogle(googleIdToken);
    } catch {
      res.status(401).json("Invalid Google ID token");
    }

    const decoded = jwt.decode(googleIdToken) as {
      name: string;
      email: string;
      picture: string;
    };

    const db = await mongo.connect();
    const users = db.collection("users");

    const user = await users.findOne({ email: decoded.email });
    let userId = null;

    if (user) {
      userId = user.id;
    } else {
      const result = await users.insertOne({
        name: decoded.name,
        email: decoded.email,
        photoURL: decoded.picture,
      });
      userId = result.insertedId.toString();
      users.updateOne({ name: decoded.name }, { $set: { id: userId } });
    }
    const token = jwt.sign({ userId });
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; Path=/; Max-Age=31536000; HttpOnly`
    );
    res.status(200).json(userId);
  }
}
