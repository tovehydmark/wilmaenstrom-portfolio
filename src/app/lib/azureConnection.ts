import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = process.env.AZURE_CONNECTION;

const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString as string);

const containerName = 'wilmascontainer';

async function uploadImageToAzureStorage(fileBuffer, fileName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.upload(
    fileBuffer,
    fileBuffer.length,
    //   , {
    //   blobHTTPHeaders: {
    //     blobContentType: contentType, // Set the content type here
    //   },
    // }
  );

  return blockBlobClient.url; // Return the URL of the uploaded image
}

async function getImageUrlFromAzureStorage(fileName) {
  const containerClient = blobServiceClient.getContainerClient(containerName);
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

// import { BlobServiceClient } from '@azure/storage-blob';

// const connectionString = process.env.AZURE_CONNECTION;

// const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString as string);

// const containerName = 'wilmascontainer';

// async function uploadImageToAzureStorage(fileBuffer, fileName) {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const blockBlobClient = containerClient.getBlockBlobClient(fileName);

//   await blockBlobClient.upload(fileBuffer, fileBuffer.length);
//   return blockBlobClient.url; // Return the URL of the uploaded image
// }

// async function getImageUrlFromAzureStorage(fileName) {
//   const containerClient = blobServiceClient.getContainerClient(containerName);
//   const blockBlobClient = containerClient.getBlockBlobClient(fileName);

//   if (await blockBlobClient.exists()) {
//     return blockBlobClient.url; // Return the URL of the image
//   } else {
//     throw new Error('Image not found in Azure Blob Storage.');
//   }
// }

// export default {
//   uploadImageToAzureStorage,
//   getImageUrlFromAzureStorage,
// };
