import { connectToDatabase } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'POST') {
    const db = await connectToDatabase();
    await db.collection('BudgetGroup').insertOne(req.body)
    const data = await db.collection('BudgetGroup').find().toArray();
    res.status(200).json(data);
  } else {
    res.status(400).end();
  }
}