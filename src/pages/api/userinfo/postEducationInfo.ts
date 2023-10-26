import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { EducationModel } from '@/app/api/models';

export async function postEducationInfo(req: NextApiRequest, res: NextApiResponse) {
  console.log('req.body', req.body);

  const { degree, school, description } = req.body;
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    let newEducation = new EducationModel();
    newEducation.degree = degree;
    newEducation.school = school;
    newEducation.description = description;

    const education = await db.collection('education').insertOne(newEducation);

    res.status(201).send({ data: education });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default postEducationInfo;
