import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { WorkexperienceModel } from '@/app/api/models';

export async function postWorkexperienceInfo(req: NextApiRequest, res: NextApiResponse) {
  const { workplace, city, description } = req.body;
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    let newWorkexperience = new WorkexperienceModel();
    newWorkexperience.workplace = workplace;
    newWorkexperience.city = city;
    newWorkexperience.description = description;

    const workexperience = await db.collection('workexperience').insertOne(newWorkexperience);

    res.status(201).send({ data: workexperience });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default postWorkexperienceInfo;
