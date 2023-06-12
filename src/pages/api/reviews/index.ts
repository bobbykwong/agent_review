import type { NextApiRequest, NextApiResponse } from "next";

import { mongo } from "@/utils/mongo";
import { jwt } from "@/utils/jwt";
import { cookies } from "@/utils/cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await mongo.connect();

    if (req.method === "GET") {
      const queryParams = req.query;

      // assume client always adds `salespersonId` query param
      const salespersonId = queryParams["salespersonId"];
      const filterParams = { salespersonId };

      const reviews = await db
        .collection("reviews")
        .find(filterParams)
        .toArray();

      const totalResults = await db
        .collection("reviews")
        .countDocuments(filterParams);

      const jsonResponse = {
        pageToken: 0,
        totalResults: totalResults,
        results: reviews,
      };
      res.status(200).json(jsonResponse);
    } else if (req.method === "POST") {
      const cookie = req.headers.cookie;

      if (!cookie) {
        return res.status(401).json("Login required");
      }

      const accessToken = cookies.get(cookie, "access_token");

      if (!accessToken) {
        return res.status(401).json("Login required");
      }
      const userId = jwt.getUserId(accessToken);

      if (!userId) {
        return res.status(401).json("Login required");
      }

      const {
        salespersonId,
        experiencedAt,
        rating,
        msg,
        propertyType,
        transactionType,
      } = req.body;

      const reviews = db.collection("reviews");
      const result = await reviews.insertOne({
        createdAt: new Date().toISOString(),
        authorId: userId,
        salespersonId,
        experiencedAt,
        rating,
        msg,
        propertyType,
        transactionType,
        isVerified: false,
      });

      // Create id field with type "string"
      reviews.updateOne(
        { _id: result.insertedId },
        { $set: { id: result.insertedId.toString() } }
      );

      // Update salesperson rating and numReviews
      const averageRatings = await reviews
        .aggregate([
          {
            $match: {
              salespersonId: salespersonId,
            },
          },
          {
            $group: {
              _id: null,
              avgRating: { $avg: "$rating" },
            },
          },
        ])
        .toArray();

      const salespersons = db.collection("salespersons");
      const finalResponse = await salespersons.updateOne(
        { id: salespersonId },
        {
          $set: { rating: averageRatings[0]["avgRating"] },
          $inc: { numReviews: 1 },
        }
      );
      res.status(200).send(finalResponse);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
}
