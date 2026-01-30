import { MongoClient } from 'mongodb';

const client = new MongoClient(`mongodb://${process.env.DB_ADDRESS}:${process.env.DB_PORT}`);

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
