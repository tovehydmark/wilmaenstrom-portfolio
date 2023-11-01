import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import { AboutDocument } from '@/app/api/models/about';

export async function getAboutInfo(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');

    const aboutCollection = db.collection<AboutDocument>('about');
    const about = await aboutCollection.findOne();

    if (!about) {
      return res.status(404).json({ status: 'error', error: 'No about info found' });
    }

    return res.status(200).json({ about: about });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}

export default getAboutInfo;
