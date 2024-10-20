import { Db, MongoClient } from "mongodb";

const uri = 'mongodb://luis:budget123@localhost:27017/';
const client = new MongoClient(uri);

let cachedDb : any = null;

export async function connectToDatabase():Promise<Db> {
    if (cachedDb) {
      return cachedDb;
    }
  
    await client.connect();
  
    const db = client.db('budgetdb'); // Replace 'my-database' with your database name
    cachedDb = db;
    return db;
  }