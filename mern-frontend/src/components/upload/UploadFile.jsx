import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState(null);


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); 

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData, 
      });

      if (response.ok) {
        const result = await response.json();
        alert("File uploaded successfully!");
        console.log(result);
      } else {
        console.error("Error uploading file:", response.statusText);
        alert("Failed to upload the file.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div>
      <h1>Upload your content</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;

const FileUpload = {};

const [file, setFile] = useState(FileUpload);

const handleFileChange = () => {
  const { name, value } = e.target;
  const fileToUpload = { ...file, [name]: value };
  setFile(fileToUpload);
};
<input type="file" name="file" onChange={handleFileChange} />;
