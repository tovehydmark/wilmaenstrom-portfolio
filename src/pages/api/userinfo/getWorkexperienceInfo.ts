import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import { WorkexperienceDocument } from '@/app/api/models/workexperience';

export async function getWorkexperienceInfo(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');

    const workexperienceCollection = db.collection<WorkexperienceDocument[]>('workexperience');
    const workexperienceArray = await workexperienceCollection.find().toArray();

    if (workexperienceArray.length === 0) {
      return res.status(404).json({ status: 'error', error: 'No work experience found' });
    }

    return res.status(200).json({ workexperience: workexperienceArray });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}

export default getWorkexperienceInfo;
