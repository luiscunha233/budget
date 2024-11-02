import { connectToDatabase } from '@/lib/db';
import { Budget } from '@/model/model';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();
  const data = await db.collection('Transactions').find({ 'budgetId' : req.query['budget'] as string }).toArray();

  if(data == null){
    res.status(404).end();
  }else{
    res.status(200).json(data)
  }
}