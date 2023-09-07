"use client";

import { useState } from "react";

export default function FileUpload() {
  const [selectedFile, setSelectedFile] = useState();
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setSuccess(false);
  };

  const handleUpload = async () => {
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
