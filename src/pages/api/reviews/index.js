import { mongo } from "@/utils/mongo";

export default async function handler(req, res) {
    const db = await mongo.connect();
    const queryParams = req.query;
    const page = queryParams["page"] ? parseInt(queryParams["page"]) : 0
    const limit = queryParams["limit"] ? parseInt(queryParams["limit"]) : 10
    
    const salespersonId = queryParams["salespersonId"]
    
    const filterParams = {}
    if(salespersonId)
    {
        filterParams["salespersonId"] = salespersonId
    }

    const reviews = await db.collection("reviews")
                                  .find(filterParams)
                                  .skip(page)  
                                  .limit(limit)
                                  .toArray();
    
    const jsonResponse = {
        "pageToken": page,
        "totalResults": 1000,
        "results": reviews
    }                              
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
}