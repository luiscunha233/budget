import { Db, MongoClient } from "mongodb";

const uri = 'mongodb://luis:budget123@localhost:27017/';
const client = new MongoClient(uri);

export async function connectToDatabase():Promise<Db> {
    

    if (global.cachedDb) {
      return globalThis.cachedDb;
    }
  
    await client.connect();
  
    globalThis.cachedDb = client.db('budgetdb'); // Replace 'my-database' with your database name
    return globalThis.cachedDb;
  }