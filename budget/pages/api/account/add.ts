import { connectToDatabase } from '@/lib/db';
import { Budget } from '@/model/model';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();
  console.log(req.body)
  await db.collection('Accounts').insertOne(req.body)
  const data = await db.collection('Accounts').find().toArray()
  res.status(200).json(data)
}