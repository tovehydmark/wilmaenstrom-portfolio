import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import { EducationDocument } from '@/app/api/models/education';

export async function getEducationInfo(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');

    const educationCollection = db.collection<EducationDocument[]>('education');
    const educationArray = await educationCollection.find().toArray();

    if (educationArray.length === 0) {
      return res.status(404).json({ status: 'error', error: 'No education found' });
    }

    return res.status(200).json({ education: educationArray });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}

export default getEducationInfo;
