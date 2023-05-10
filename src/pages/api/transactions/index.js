import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {
  const db = await mongo.connect();
  const queryParams = req.query;
  const page = queryParams["page"] ? parseInt(queryParams["page"]) : 0;
  const limit = queryParams["limit"] ? parseInt(queryParams["limit"]) : 10;
  const skippedDocs = page * limit;
  const salespersonId = queryParams["salespersonId"];
  let transactions;
  let totalResults;

  // Give all transactions
  if (!salespersonId) {
    transactions = await db
      .collection("transactions")
      .find({})
      .skip(skippedDocs)
      .limit(limit)
      .toArray();

    // Using estimatedDocumentCount not as accurate as countDocuments but much fast and should be sufficient for simply getting all docs in collection
    totalResults = await db
      .collection("transactions")
      .estimatedDocumentCount({});
  } else {
    transactions = await db
      .collection("transactions")
      .find({ salespersonId: salespersonId })
      .skip(skippedDocs)
      .limit(limit)
      .toArray();

    totalResults = await db
      .collection("transactions")
      .countDocuments({ salespersonId: salespersonId });
  }

  const jsonResponse = {
    pageToken: page,
    totalResults: totalResults,
    results: transactions,
  };
  res.status(200).json(jsonResponse);
}
