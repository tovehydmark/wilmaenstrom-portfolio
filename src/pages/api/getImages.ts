import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export async function getImages(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');
    const collection = db.collection('images');

    const images = await collection.find().toArray();

    res.json(images);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export default getImages;
