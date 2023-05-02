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
      return res.status(404).json({ message: "Salesperson not found" });
    }

    res.status(200).json(salesperson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
