import { NextApiRequest, NextApiResponse } from 'next';
import azureStorage from '../../app/lib/azureConnection';

export async function getImages(req: NextApiRequest, res: NextApiResponse) {
  try {
    const fileName = 'example-12';
    const imageUrl = await azureStorage.getImageUrlFromAzureStorage(fileName);

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.log('error', error);
  }
}

export default getImages;
