import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/app/lib/mongodb';
import AboutModel, { AboutDocument } from '@/app/api/models/about';

export async function postAboutInfo(req: NextApiRequest, res: NextApiResponse) {
  const { description } = req.body;
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    const aboutCollection = db.collection<AboutDocument>('about');

    const updateResult = await aboutCollection.updateOne({}, { $set: { description } });

    if (updateResult.modifiedCount === 1) {
      return res.status(200).json({ message: 'About information updated successfully' });
    } else {
      //This is run when the user hasn't yet created any description and the DB is empty
      try {
        let about = new AboutModel();
        about.description = description;

        const education = await db.collection('about').insertOne(about);

        res.status(201).send({ data: education });
      } catch (error) {
        console.log('error', error);

        res.status(401).send({ error: error });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export default postAboutInfo;
