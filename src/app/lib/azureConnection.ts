import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_CONNECTION;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString as string);
const containerName = process.env.AZURE_CONTAINERNAME;

async function uploadImageToAzureStorage(fileBuffer: Buffer, fileName: string, contentType: string) {
  const containerClient = blobServiceClient.getContainerClient(containerName as string);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  try {
    await blockBlobClient.uploadData(fileBuffer, {
      blobHTTPHeaders: { blobContentType: contentType },
    });

    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// export { uploadImageToAzureStorage };

async function getImageUrlFromAzureStorage(fileName: string) {
  const containerClient = blobServiceClient.getContainerClient(containerName as string);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  if (await blockBlobClient.exists()) {
    return blockBlobClient.url; // Return the URL of the image
  } else {
    throw new Error('Image not found in Azure Blob Storage.');
  }
}

export default {
  uploadImageToAzureStorage,
  getImageUrlFromAzureStorage,
};
