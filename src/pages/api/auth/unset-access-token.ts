import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", "access_token=; Path=/; HttpOnly; Max-Age=0");
    return res.status(200).send("Access token has been unset");
  }
}
