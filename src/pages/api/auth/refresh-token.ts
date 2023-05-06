import type { NextApiRequest, NextApiResponse } from "next";

import { jwt } from "@/utils/jwt";
import { cookies } from "@/utils/cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const cookie = req.headers.cookie;

    if (!cookie) {
      return res.status(401).send("No access token.");
    }

    const accessToken = cookies.get(cookie, "access_token");

    if (accessToken) {
      try {
        jwt.verify(accessToken);
        const userId = jwt.getUserId(accessToken);
        const token = jwt.sign({ userId });
        res.setHeader(
          "Set-Cookie",
          `access_token=${token}; Path=/; Max-Age=31536000; HttpOnly`
        );
        return res.status(200).send(userId);
      } catch {
        return res.status(401).send("Invalid access token");
      }
    }
  }
  return res.status(401).send("Invalid access token");
}
