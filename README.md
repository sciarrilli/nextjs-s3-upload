working nextjs s3 file upload

1. removed global.css classes
2. added page.js
3. updated next.config.js to remove aws-crt warning
4. npm install @aws-sdk/signature-v4-crt and then npm uninstall @aws-sdk/signature-v4-crt
5. npm install @aws-sdk/client-s3
6. rename env.example to .env.local and add your AWS credentials

unpacking formData was challenging. the real trick was the arrayBuffer() method and then converting that to a buffer.

```javascript
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


```
