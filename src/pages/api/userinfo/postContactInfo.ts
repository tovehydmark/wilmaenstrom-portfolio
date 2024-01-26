import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ContactModel } from '@/app/api/models';

export async function postContactInfo(req: NextApiRequest, res: NextApiResponse) {
  const { description, phone, email } = req.body;
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    let newContact = new ContactModel();

    newContact.description = description;
    newContact.phone = phone;
    newContact.email = email;

    //TODO: Update this so that it writes over instead of pushing in a new
    const contact = await db.collection('contact').insertOne(newContact);

    res.status(201).send({ data: contact });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default postContactInfo;
