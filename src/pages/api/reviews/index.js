import { mongo } from "@/utils/mongo";
import { jwt } from "@/utils/jwt";
import { cookies } from "@/utils/cookies";

export default async function handler(req, res) {
  const db = await mongo.connect();

  if (req.method === "GET") {
    const queryParams = req.query;
    const page = queryParams["page"] ? parseInt(queryParams["page"]) : 0;
    const limit = queryParams["limit"] ? parseInt(queryParams["limit"]) : 10;

    const salespersonId = queryParams["salespersonId"];

    const filterParams = {};
    if (salespersonId) {
      filterParams["salespersonId"] = salespersonId;
    }

    const reviews = await db
      .collection("reviews")
      .find(filterParams)
      .skip(page)
      .limit(limit)
      .toArray();

    const jsonResponse = {
      pageToken: page,
      totalResults: 1000,
      results: reviews,
    };
    res.status(200).json(jsonResponse);

    // const reviews = await db.collection("reviews")
    //                               .aggregate([
    //                                 // {$match: {town: "BUKIT PANJANG"}},
    //                                 // {$count: "total transactions"}
    //                                 {$group:
    //                                     {
    //                                         _id: "$salespersonId",
    //                                         count:{$sum:1}
    //                                     }
    //                                 }
    //                               ])
    //                               .toArray();
    // res.status(200).send(reviews);
  } else if (req.method === "POST") {
    const cookie = req.headers.cookie;
    const accessToken = cookies.get(cookie, "access_token");

    if (!accessToken) {
      return res.status(401).json("Login required");
    }
    const userId = jwt.getUserId(accessToken);

    if (!userId) {
      return res.status(401).json("Login required");
    }

    const { salespersonId, experiencedAt, rating, msg } = req.body;
    const reviews = db.collection("reviews");
    const result = await reviews.insertOne({
      createdAt: new Date().toISOString(),
      authorId: userId,
      salespersonId,
      experiencedAt,
      rating,
      msg,
      isVerified: false,
    });
    reviews.updateOne(
      { _id: result.insertedId },
      { $set: { id: result.insertedId.toString() } }
    );
    return res.status(200).json(result.insertedId.toString());
  }
}
