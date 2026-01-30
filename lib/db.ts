import { MongoClient } from 'mongodb';

const {DB_USER, DB_PASSWORD, DB_ADDRESS, DB_PORT, DB_NAME } = process.env;
const client = new MongoClient(`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_ADDRESS}:${DB_PORT}/${DB_NAME}`);

async function connectToDB() {
  try { 
    await client.connect();
    return client;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUsers() {
  try {
    await connectToDB();

    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION);

    const users = await collection.find({}).toArray();
    return users;
  } catch (err) {
    console.log(err);
    return [];
  } finally {
    await client.close();
  }
}
