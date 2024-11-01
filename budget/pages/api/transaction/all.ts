import { connectToDatabase } from '@/lib/db';
import { Budget, Transcation } from '@/model/model';
import { Transaction } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Transcation[]>
) {
  const db = await connectToDatabase();
  const data = await db.collection('Transactions').find().toArray()
  res.status(200).json(data as Transcation[])
}