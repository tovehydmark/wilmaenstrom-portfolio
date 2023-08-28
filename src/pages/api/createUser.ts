import { UserModel } from '@/app/api/models';
import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    let newUser = new UserModel();
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    const user = await db.collection('users').insertOne(newUser);

    res.status(201).send({ data: user });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default createUser;
