import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export async function postImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');
    const imageData = req.body;

    const result = await db.collection('images').insertOne(imageData);

    res.json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default postImage;
