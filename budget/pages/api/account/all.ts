import { connectToDatabase } from '@/lib/db';
import { Budget } from '@/model/model';
import type { NextApiRequest, NextApiResponse } from 'next'

export interface BudgetAll{
  startDate:Date
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Budget[]>
) {
  const db = await connectToDatabase();
  const data = await db.collection('Accounts').find().toArray()
  res.status(200).json(data as Budget[])
}