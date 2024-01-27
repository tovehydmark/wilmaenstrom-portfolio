import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import { AboutDocument } from '@/app/api/models/about';
import { ContactDocument } from '@/app/api/models/contact';

export async function getContactInfo(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('wilma-portfolio');

    const contactCollection = db.collection<ContactDocument>('contact');

    const contact = await contactCollection.findOne();

    if (!contact) {
      return res.status(404).json({ status: 'error', error: 'No contact info found' });
    }

    return res.status(200).json({ contact: contact });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}

export default getContactInfo;
