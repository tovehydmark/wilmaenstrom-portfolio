import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export async function postHeaderImageToMongoDB(req: NextApiRequest, res: NextApiResponse) {
  const { imageUrl, fileName } = req.body.imageData;
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    const filter = {};
    const update = { $set: { imageUrl: imageUrl, fileName: fileName } };
    const options = { upsert: true }; // Creates a new document if none exists

    const result = await db.collection('headerImg').findOneAndUpdate(filter, update, options);

    res.status(200).send({ data: result });
  } catch (error) {
    console.log('error', error);

    res.status(500).send({ error: error });
  }
}

export default postHeaderImageToMongoDB;
