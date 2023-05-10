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

    const results = salespersons.aggregate([
      { $match: { id } },
      {
        $lookup: {
          from: "transactions",
          localField: "id",
          foreignField: "salespersonId",
          as: "transactions",
        },
      },
      {
        $addFields: {
          numTransactions: { $size: "$transactions" },
        },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "id",
          foreignField: "salespersonId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          numReviews: { $size: "$reviews" },
        },
      },
      {
        $project: {
          id: 1,
          name: 1,
          photoURL: 1,
          rating: 1,
          numTransactions: 1,
          numReviews: 1,
          registrationNum: 1,
          registrationStartDate: 1,
          registrationEndDate: 1,
          estateAgentName: 1,
          estateAgentLicenseNum: 1,
        },
      },
    ]);

    const exists = await results.hasNext();

    if (!exists) {
      return res.status(404).json("Salesperson not found");
    }

    const salesperson = await results.next();
    res.status(200).json(salesperson);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
