const {
  BlobServiceClient,
  BlobSASPermissions,
  generateBlobSASQueryParameters,
} = require("@azure/storage-blob");

const moment = require("moment");
const { v1: uuidv1 } = require("uuid");

const CONNECTION_STRING =
  "DefaultEndpointsProtocol=https;AccountName=pswebapp;AccountKey=Mp0/oAFtsBtjJdES3llTGbgEIybzBoSu048SeFSZq0Yr/aRVkztohn66w64oKnhd6CbXiZM+T+VMTK5LnLBwJQ==;EndpointSuffix=core.windows.net";
const containerName = "userimages";

let _containerClient;
const getContainerClient = async () => {
  if (!_containerClient) {
    const blobServiceClient = await BlobServiceClient.fromConnectionString(
      CONNECTION_STRING
    );
    _containerClient = await blobServiceClient.getContainerClient(
      containerName
    );
  }
  return _containerClient;
};

const getSASQueryString = (fileId, credential) => {
  const params = {
    containerName: containerName,
    blobName: fileId,
    permissions: BlobSASPermissions.parse("r"),
    startsOn: new Date(),
    expiresOn: moment().add(30, "minutes"),
  };
  return generateBlobSASQueryParameters(params, credential).toString();
};

module.exports.uploadImage = async (stream) => {
  const containerClient = await getContainerClient();
  const fileId = uuidv1();
  const blockBlobClient = containerClient.getBlockBlobClient(fileId);
  await blockBlobClient.uploadStream(stream);
  return {
    id: fileId,
  };
};

module.exports.getImageUri = async (id) => {
  const containerClient = await getContainerClient();
  const blockBlobClient = containerClient.getBlockBlobClient(id);
  return `${blockBlobClient.url}?${getSASQueryString(
    id,
    containerClient.credential
  )}`;
};
