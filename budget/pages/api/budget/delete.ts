import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface BudgetDelete {
    id:ObjectId
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if(req.method == 'POST'){
        const db = await connectToDatabase();
        let requestBody = req.body as BudgetDelete
        await db.collection('Budget').deleteOne({_id:requestBody.id})
        res.status(200)
    }
  }