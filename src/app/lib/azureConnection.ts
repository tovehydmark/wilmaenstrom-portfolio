import { BlobDeleteOptions, BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_CONNECTION;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString as string);
const containerName = process.env.AZURE_CONTAINERNAME;

async function uploadImageToAzureStorage(fileBuffer: Buffer, fileName: string, contentType: string) {
  const containerClient = blobServiceClient.getContainerClient(containerName as string);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    // Check if a blob with the same name already exists
    const blobExists = await blockBlobClient.exists();

    if (blobExists) {
      throw new Error('File with the same name already exists.');
    }

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

async function deleteImageFromAzure(fileName: string) {
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

async function getImageUrlFromAzureStorage(fileName: string) {
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
