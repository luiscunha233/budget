import { connectToDatabase } from '@/lib/db';
import { BudgetGroup } from '@/model/model';
import type { NextApiRequest, NextApiResponse } from 'next'

export interface BudgetAll{
  startDate:Date
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BudgetGroup[]>
) {
  const db = await connectToDatabase();
  const data = await db.collection('BudgetGroup').find().toArray()
  res.status(200).json(data as BudgetGroup[])
}