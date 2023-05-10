import type { NextApiRequest, NextApiResponse } from "next";

import { mongo } from "@/utils/mongo";
import { Salesperson } from "@/features/salespersons";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as Salesperson["id"];

  try {
    const db = await mongo.connect();
    const salespersons = db.collection("salespersons");
    const salesperson = await salespersons.findOne({ id });

    if (!salesperson) {
      return res.status(404).json("Salesperson not found");
    }

    return res.status(200).json({
      pageToken: 0,
      totalResults: 500,
      results: salesperson["transactions"],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
