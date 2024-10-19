import { NextApiRequest, NextApiResponse } from "next";


import { MongoClient } from 'mongodb';

const uri = 'mongodb://luis:budget123@localhost:27017/';
const client = new MongoClient(uri);

let cachedDb : any = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  await client.connect();

  const db = client.db('budgetdb'); // Replace 'my-database' with your database name
  cachedDb = db;
  return db;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    if(req.method == 'POST'){
        const db = await connectToDatabase();
        const data = await db.collection('expenses').insertOne(req.body);
    }
    
  }