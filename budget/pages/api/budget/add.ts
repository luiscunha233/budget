import { connectToDatabase } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();
  const newBudget = await db.collection('Budget').insertOne(req.body);

  res.status(200).json(await db.collection('Budget').findOne({ '_id' : newBudget.insertedId }))
}