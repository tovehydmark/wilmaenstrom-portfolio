import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import { ImageDocument } from '@/app/api/models/Image';

export async function getImages(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');

    const imageCollection = db.collection<ImageDocument[]>('images');
    const imagesArray = await imageCollection.find().toArray();

    if (imagesArray.length === 0) {
      return res.status(404).json({ status: 'error', error: 'No images found' });
    }

    return res.status(200).json({ images: imagesArray });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}

export default getImages;
