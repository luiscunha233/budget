import { connectToDatabase } from '@/lib/db';
import { Budget } from '@/model/model';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();
  await db.collection('Budget').insertOne(req.body)
  const data = await db.collection('Budget').find().toArray()
  res.status(200).json(data)
}