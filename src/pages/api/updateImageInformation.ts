import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';

export async function updateImageInformation(req: NextApiRequest, res: NextApiResponse) {
  const { updatedImageDescription, id } = req.body;

  const imageIdToUpdate = { _id: new ObjectId(id) };
  const updateQuery = {
    $set: { imageDescription: updatedImageDescription },
  };

  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    const updateDescription = await db.collection('images').findOneAndUpdate(imageIdToUpdate, updateQuery);
    res.status(201).send({ data: updateDescription });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default updateImageInformation;
