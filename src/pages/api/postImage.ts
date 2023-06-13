import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export async function postImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('images');
    const title = req.body;

    const post = await db.collection('posts').insertOne({
      title,
    });

    res.json(post);
  } catch (e) {
    console.error(e);
  }
}

export default postImage;
