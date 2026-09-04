import { Collection, MongoClient } from 'mongodb';
import { AnswerSchema, UserSchema } from './analytics.types';

const client = new MongoClient(process.env.DB_CONNECTION);

async function connectToDB() {
  try {
    await client.connect();
    return client;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getData() {
  try {
    await connectToDB();

    const db = client.db(process.env.DB_NAME);
    const usersCollection: Collection<UserSchema> = db.collection<UserSchema>(
      'users',
    );
    const answersCollection: Collection<AnswerSchema> = db.collection<AnswerSchema>(
      'answers',
    );

    const users = await usersCollection.find({}).toArray();
    const answers = await answersCollection.find({}).toArray();
    return {
      users,
      answers
    };
  } catch (err) {
    console.log(err);
    return [];
  } finally {
    await client.close();
  }
}
