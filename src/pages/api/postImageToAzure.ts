import { NextApiRequest, NextApiResponse } from 'next';
import azureStorage from '../../app/lib/azureConnection';

export default async function postImageToAzure(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fileBuffer = Buffer.from(req.body.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const fileName = req.headers.imagename;
    const imageUrl = await azureStorage.uploadImageToAzureStorage(fileBuffer, fileName, req.headers['content-type']);

    const imageData = { imageUrl: imageUrl, fileName: fileName };
    res.status(200).json(imageData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Image upload failed' });
  }
}
