import { connectToDatabase } from '@/lib/db';

import { comboxDateMaper } from '@/utility/mapper';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await connectToDatabase();
  const data = await db.collection('Budget').find().toArray();

  if(data == null){
    res.status(200).json([]);
  }

  const mappedData = data.map(comboxDateMaper);

  res.status(200).json(mappedData);
}