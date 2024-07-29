"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

type SignedURLResponse = {
  failure?: string;
  success?: {
    url: string;
  };
};

const allowedFileTypes = [
  "image/jpeg",
  "image/png"
]

type GetSignedURLParams = {
  fileName: string
  fileType: string
  fileSize: number
}

const maxFileSize = 1048576 * 50 // 1 MB
const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getSignedURL({
  fileName,
  fileType,
  fileSize,
}: GetSignedURLParams): Promise<SignedURLResponse> {
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" }
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" }
  }

  const putObjectCommand = new PutObjectCommand({
    Bucket: "psl-s3-vercel-bucket",//process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    Metadata: {
      userName: fileName
    },
  });

  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 3600 } // 60 seconds
  );

  return { success: { url: url } };
}
