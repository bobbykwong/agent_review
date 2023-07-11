import type { NextApiRequest, NextApiResponse } from "next";

import { mongo } from "@/utils/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await mongo.connect();

    const queryParams = req.query;
    const limitParam = queryParams["limit"];
    const limit = limitParam ? parseInt(limitParam as string) : 5;

    const reviews = await db
      .collection("reviews")
      .aggregate([
        { $sort: { _id: -1 } },
        { $limit: limit },
        {
          $lookup: {
            from: "salespersons",
            localField: "salespersonId",
            foreignField: "id",
            as: "salesperson",
          },
        },
      ])
      .toArray();

    const jsonResponse = {
      pageToken: 0,
      totalResults: limit,
      results: reviews,
    };
    res.status(200).json(jsonResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
