import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import { ImageDocument } from '@/app/api/models/Image';
import { ObjectId } from 'mongodb';

export async function getImages(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');

    const id = new ObjectId(req.query.id as string);

    const imageCollection = db.collection<ImageDocument[]>('images');
    const image = await imageCollection.findOne({ _id: id });

    if (!image) {
      return res.status(404).json({ status: 'error', error: 'No image found' });
    }

    return res.status(200).json({ image: image });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}

export default getImages;
