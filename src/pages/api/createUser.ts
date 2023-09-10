import { UserModel } from '@/app/api/models';
import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs, { genSaltSync } from 'bcryptjs';

export async function createUser(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  const username = req.body.username;
  const plainTextPassword = req.body.password;

  // encrypting our password to store in database
  const password = await bcryptjs.hash(plainTextPassword, genSaltSync(10).toString());

  try {
    let newUser = new UserModel();
    newUser.username = username;
    newUser.password = password;

    const user = await db.collection('users').insertOne(newUser);

    res.status(201).send({ data: user });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default createUser;
