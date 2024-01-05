import { BlobDeleteOptions, BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_CONNECTION;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString as string);

async function uploadImageToAzureStorage(
  fileBuffer: Buffer,
  fileName: string,
  contentType: string,
  containerName: any,
) {
  const containerClient = blobServiceClient.getContainerClient(containerName as string);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    // If the blob doesn't exist, proceed with the upload
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: { blobContentType: contentType },
    });

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

async function deleteImageFromAzure(fileName: string, containerName: string | undefined) {
  const options: BlobDeleteOptions = {
    deleteSnapshots: 'include',
  };

  // Get the container client and block blob client
  const containerClient = blobServiceClient.getContainerClient(containerName as string);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    const blobExists = await blockBlobClient.exists();

    if (!blobExists) {
      throw new Error('Image not found');
    }

    await blockBlobClient.delete(options);

    return 'Image deleted successfully from Azure';
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

async function getImageUrlFromAzureStorage(fileName: string, containerName: string | undefined) {
  const containerClient = blobServiceClient.getContainerClient(containerName as string);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  if (await blockBlobClient.exists()) {
    return blockBlobClient.url;
  } else {
    throw new Error('Image not found in Azure Blob Storage.');
  }
}

export default {
  uploadImageToAzureStorage,
  deleteImageFromAzure,
  getImageUrlFromAzureStorage,
};
