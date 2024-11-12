import { Db, MongoClient } from "mongodb";

const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri);

export async function connectToDatabase():Promise<Db> {
    

    if (global.cachedDb) {
      return globalThis.cachedDb;
    }
  
    await client.connect();
  
    globalThis.cachedDb = client.db('budgetdb'); // Replace 'my-database' with your database name
    return globalThis.cachedDb;
  }