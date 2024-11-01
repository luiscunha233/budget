import { connectToDatabase } from "@/lib/db";
import { Budget } from "@/model/model";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    if(req.method == 'POST'){
        const db = await connectToDatabase();
        let requestBody = req.body as Budget
        await db.collection('Transactions').deleteOne({ _id: new ObjectId(requestBody._id) })
        res.status(200).end();
    }else{
      res.status(400).end();
    }
  }