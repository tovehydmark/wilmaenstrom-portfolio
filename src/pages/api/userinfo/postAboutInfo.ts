import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import AboutModel from '@/app/api/models/about';

export async function postAboutInfo(req: NextApiRequest, res: NextApiResponse) {
  const { description } = req.body;
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    // Kontrollera om det redan finns en "about" post i databasen
    const existingAbout = await db.collection('about').findOne();

    if (existingAbout) {
      // Om det finns en post, uppdatera den
      await db.collection('about').updateOne({}, { $set: { description } });
      res.status(200).send({ data: 'Informationen har uppdaterats' });
    } else {
      // Om det inte finns någon about-post, skapa en ny
      let about = new AboutModel();
      about.description = description;
      const education = await db.collection('about').insertOne(about);
      res.status(201).send({ data: education });
    }
  } catch (error) {
    console.log('error', error);
    res.status(401).send({ error: error });
  }
}

export default postAboutInfo;
