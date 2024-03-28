import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const bucket = 'caffeineculture' as string;

const generateUploadParams = async (fileKey: string, fileBody: string) => {
  return {
    Bucket: bucket,
    Key: fileKey,
    Body: fileBody
  }
}

const accessParams = async (fileKey: string) => {
  return {
    Bucket: bucket,
    Key: fileKey,
  }
}

export {s3, generateUploadParams, accessParams}