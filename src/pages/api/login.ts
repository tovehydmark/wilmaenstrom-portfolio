import { UserModel } from '@/app/api/models';
import clientPromise from '@/app/lib/mongodb'; // Update import to match your file structure
import { NextApiRequest, NextApiResponse } from 'next/types';
import bcryptjs from 'bcryptjs';

const verifyUserLogin = async (username: string, password: string) => {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');

    const userCollection = db.collection('users');
    const user = await userCollection.findOne({ username });

    if (!user) {
      return { status: 'error', error: 'User not found' };
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (isPasswordValid) {
      return { status: 'ok', data: 'User logged in successfully' };
    } else {
      return { status: 'error', error: 'Invalid password' };
    }
  } catch (error) {
    console.error(error);
    return { status: 'error', error: 'An error occurred' };
  }
};

export async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;

    const loginResult = await verifyUserLogin(username, password);

    if (loginResult.status === 'ok') {
      // Here, you can generate and return a JWT token for the user
      // and handle successful login as per your requirements.
      return res.status(200).json({ message: loginResult.data });
    } else {
      return res.status(401).json({ message: loginResult.error });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

export default login;
