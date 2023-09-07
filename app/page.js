"use client";

import { useState } from "react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
//import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSuccess(false);
  };

  const handleUpload = async () => {
    // const client = new S3Client({
    //   credentials: {
    //     accessKeyId: process.env.NEXT_PUBLIC_ACCESSKEYID,
    //     secretAccessKey: process.env.NEXT_PUBLIC_SECRETACCESSKEY,
    //   },
    //   region: process.env.NEXT_PUBLIC_REGION,
    // });

    const data = new FormData();
    data.set("file", selectedFile);
    data.set("filename", selectedFile.name);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
      console.log(res.json());
      setSuccess(true);
    } catch (err) {
      console.error(err);
    }

    // const command = new PutObjectCommand({
    //   Bucket: process.env.NEXT_PUBLIC_BUCKET,
    //   Key: selectedFile.name,
    //   Body: selectedFile,
    // });

    // console.log(selectedFile);

    // try {
    //   const response = await client.send(command);
    //   setSuccess(true);
    //   console.log(response);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return (
    <div className="bg-white dark:bg-slate-800 flex">
      <div className="pt-20 w-screen h-screen">
        <div className="flex justify-center  text-slate-900 dark:text-white pb-6 text-4xl">
          Next.js S3 File Uploader
        </div>
        <div className="flex justify-center">
          <input
            className="pb-4 text-slate-900 dark:text-white"
            type="file"
            onChange={handleFileChange}
          />

          <button
            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {success ? (
          <div className="flex justify-center text-green-500 pt-6">
            Successfully uploaded {selectedFile.name}!
          </div>
        ) : null}
      </div>
    </div>
  );
}
