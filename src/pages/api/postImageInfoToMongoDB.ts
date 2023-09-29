import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { ImageModel } from '@/app/api/models';
import { ObjectId } from 'mongodb';

export async function postImageInfoToMongoDB(req: NextApiRequest, res: NextApiResponse) {
  const { imageUrl, fileName } = JSON.parse(req.body);
  const client = await clientPromise;
  const db = client.db('wilma-portfolio');

  try {
    let newImage = new ImageModel();
    newImage.imageUrl = imageUrl;
    newImage.fileName = fileName;

    const image = await db.collection('images').insertOne(newImage);

    res.status(201).send({ data: image });
  } catch (error) {
    console.log('error', error);

    res.status(401).send({ error: error });
  }
}

export default postImageInfoToMongoDB;
