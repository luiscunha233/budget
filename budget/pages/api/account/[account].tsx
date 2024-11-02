import { connectToDatabase } from '@/lib/db';
import { ObjectId } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();
  const data = await db.collection('Accounts').findOne({ '_id' : new ObjectId(req.query['account'] as string) });

  if(data == null){
    res.status(404).end();
  }else{
    res.status(200).json(data)
  }
}