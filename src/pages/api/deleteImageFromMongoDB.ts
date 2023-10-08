import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'bson';

export async function deleteImageFromMongoDB(req: NextApiRequest, res: NextApiResponse) {
  const objectId = new ObjectId(req.body);
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    const deleteImage = await db.collection('images').deleteOne({ _id: objectId });

    if (deleteImage.deletedCount > 0) {
      res.status(201).send('Image deleted from MongoDB');
    } else {
      res.status(404).send('Image not found');
    }
  } catch (error) {
    console.error('error', error);
    res.status(500).send({ error: 'An error occurred while deleting the image' });
  }
}

export default deleteImageFromMongoDB;
