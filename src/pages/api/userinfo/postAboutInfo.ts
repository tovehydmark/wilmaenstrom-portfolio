import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { EducationModel } from '@/app/api/models';

export async function postAboutInfo(req: NextApiRequest, res: NextApiResponse) {
  const { description } = req.body;
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    let about = new EducationModel();
    about.description = description;

    const education = await db.collection('about').insertOne(about);

    res.status(201).send({ data: education });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default postAboutInfo;
