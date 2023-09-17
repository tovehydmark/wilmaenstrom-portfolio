import { NextApiRequest, NextApiResponse } from 'next';
import azureStorage from '../../app/lib/azureConnection';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
  maxDuration: 5,
};

export default async function postImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fileBuffer = Buffer.from(req.body.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const fileName = 'example-1';
    const imageUrl = await azureStorage.uploadImageToAzureStorage(
      fileBuffer,
      fileName,
      req.headers['content-type'] as string,
    );

    res.status(200).json(imageUrl);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}
