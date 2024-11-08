import { connectToDatabase } from '@/lib/db';
import { Budget } from '@/model/model';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();

  if (req.body == null || req.body.budgets == null || req.body.budgets.length == 0) {
    res.status(400).end();
  } else {
    const data = await db.collection('Budget').find({ "_id": { "$in": req.body.budgets.map((budget: string) => new ObjectId(budget)) } }).toArray();
    if (data == null) {
      res.status(404).json([]);;
    } else {
      res.status(200).json(data)
    }
  }


}