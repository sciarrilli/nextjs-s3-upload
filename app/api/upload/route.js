import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req) {
  const data = await req.formData();
  console.log(data);
  //console.log(data.get("filename"));

  const file = data.get("file");
  const filename = data.get("filename");

  console.log(filename);
  console.log(file);
  //console.log(file.value[0]);

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const client = new S3Client({
    credentials: {
      accessKeyId: process.env.ACCESSKEYID,
      secretAccessKey: process.env.SECRETACCESSKEY,
    },
    region: process.env.REGION,
  });

  const command = new PutObjectCommand({
    Bucket: process.env.BUCKET,
    Key: filename,
    Body: buffer,
  });

  console.log(command);

  try {
    const response = await client.send(command);
    //setSuccess(true);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
  return NextResponse.json({ success: true });
}
