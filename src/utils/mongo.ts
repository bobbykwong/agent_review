import { MongoClient, Db } from "mongodb";

let client = new MongoClient(process.env.DB_CONNECTION_STRING as string);

let cachedDb: Db | null = null;

export const mongo = {
  init: () => {
    client = new MongoClient(process.env.DB_CONNECTION_STRING as string);
  },
  connect: async (): Promise<Db> => {
    if (cachedDb) {
      return Promise.resolve(cachedDb);
    }
    await client.connect();
    cachedDb = client.db(process.env.DB_NAME);
    return Promise.resolve(cachedDb);
  },
  close: async () => {
    await client.close();
  },
};