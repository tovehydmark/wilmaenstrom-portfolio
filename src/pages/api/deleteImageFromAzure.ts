import { NextApiRequest, NextApiResponse } from 'next';
import azureStorage from '../../app/lib/azureConnection';

async function deleteImageFromAzure(req: NextApiRequest, res: NextApiResponse) {
  const containerName = process.env.AZURE_CONTAINERNAME;

  try {
    const fileName = req.body as string;

    const deleteImage = await azureStorage.deleteImageFromAzure(fileName, containerName);

    if (deleteImage === 'Image deleted successfully from Azure') {
      res.status(200).json({ message: 'Image deleted successfully' });
    } else {
      res.status(500).json({ error: 'Image deletion from Azure failed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Image deletion failed' });
  }
}
export default deleteImageFromAzure;
