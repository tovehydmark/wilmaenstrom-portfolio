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

    // Kontrollera om det redan finns en "contact" post i databasen

    const existingContactInfo = await db.collection('contact').findOne();

    if (existingContactInfo) {
      // Om det finns en post, uppdatera den

      await db.collection('contact').updateOne({}, { $set: { description, phone, email } });
      res.status(200).send({ data: 'Informationen har uppdaterats' });
    } else {
      // Om det inte finns någon contact-post, skapa en ny

      const contact = await db.collection('contact').insertOne(newContact);

      res.status(201).send({ data: contact });
    }
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default postContactInfo;
