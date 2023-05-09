import { mongo } from "@/utils/mongo";
import { jwt } from "@/utils/jwt";
import { cookies } from "@/utils/cookies";

export default async function handler(req, res) {
  const db = await mongo.connect();

  if (req.method === "GET") {
    const queryParams = req.query;
    const page = queryParams["page"] ? parseInt(queryParams["page"]) : 0;
    const limit = queryParams["limit"] ? parseInt(queryParams["limit"]) : 10;
    const skippedDocs = page * limit;

    const salespersonId = queryParams["salespersonId"];

    const filterParams = {};
    if (salespersonId) {
      filterParams["salespersonId"] = salespersonId;
    }

    const reviews = await db
      .collection("reviews")
      .find(filterParams)
      .skip(skippedDocs)
      .limit(limit)
      .toArray();
    
    const totalResults = await db.collection("reviews").countDocuments(filterParams)

    const jsonResponse = {
      pageToken: page,
      totalResults: totalResults,
      results: reviews,
    };
    res.status(200).json(jsonResponse);

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
    
    // Create id field with type "string"
    reviews.updateOne(
      { _id: result.insertedId },
      { $set: { id: result.insertedId.toString() } }
    );

    /**
     * Update Agent overall ratings//
     */
    const averageRatings = await reviews
                            .aggregate([
                                {
                                    $match: 
                                    {
                                        "salespersonId" : salespersonId
                                    }
                                },
                                {
                                    $group: 
                                    {
                                        "_id": null,
                                        "avgRating": {$avg: "$rating"}
                                    }
                                }
                            ])
                            .toArray()
    // Calculate average ratings
    // res.status(200).send(averageRatings)
    // Update salesperson overall ratings
    const salespersons = db.collection("salespersons");
    const finalResponse = await salespersons.updateOne(
        {id: salespersonId },
        {$set: {rating: averageRatings[0]["avgRating"]}}
    )
    res.status(200).send(finalResponse)
    // return res.status(200).json(result.insertedId.toString());
  }
}
