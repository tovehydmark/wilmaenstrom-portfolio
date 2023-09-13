import clientPromise from '@/app/lib/mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import azureStorage from '../../app/lib/azureConnection';

export async function postImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fileBuffer = Buffer.from(req.body, 'base64');
    console.log('fileBuffer', fileBuffer);

    console.log('req.headers', req.headers);

    const fileName = 'example-10'; // Provide a filename

    const contentType = 'image/png'; // Set the desired content type

    const imageUrl = await azureStorage.uploadImageToAzureStorage(fileBuffer, fileName);
    console.log('imageUrl', imageUrl);

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.log('error', error);
  }
  //   try {
  //     const client = await clientPromise;
  //     const db = client.db('wilma-portfolio');
  //     const result = await db.collection('images').insertOne({ image: req.body });

  //     res.json(result);
  //   } catch (e) {
  //     console.error(e);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }
}

export default postImage;
