import React, { useState } from "react";

const Upload = ({ user, setUser, setPage }) => {
  const [file, setFile] = useState({
    name: '',
    value: '',
    category: ''
  });

  const [radio, setRadio] = useState('image'); //State for radio button between video/image


  const handleFileChange = (e) => {
    setFile({ ...file, [e.target.id]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setRadio(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!file) {
    //   alert("Please select a file to upload.");
    //   return;
    // }

    // const formData = new FormData();
    // formData.append("file", file); 
    console.log(user.user._id);
    
    const userId = user.user._id

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${user.user._id}/content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(file), 
      });

      if (response.ok) {
        const result = await response.json();
        alert("File uploaded successfully!");
        console.log(result);

        //append new upload to the array
        const updateUserContent = {
        ...user,
        user: {
          ...user.user,  
          content: [...user.user.content, result]
          },
        }; 

        setUser(updateUserContent)
        setPage('Profile')
        console.log(user);
        

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
        {/* add more possible field to form and model */}
        <div>
        <label>Title: </label>
        <input 
        type="text" 
        name="title"
        id="title"
        value={file.title} 
        onChange={handleFileChange} />
        </div>

        <div>
        <label>Cryptid Name: </label>
        <input 
        type="text" 
        name="name"
        id="name"
        value={file.name} 
        onChange={handleFileChange} />
        </div>

        
        <div>
        <label>Upload Type: </label>
          <input
           type="radio"
           id="videoType"
           name="type"
           value="video"
           checked={radio === 'video'}
           onChange={handleRadioChange} />
        
        <label htmlFor="videoType">Video</label>

        <input
           type="radio"
           id="imageType"
           name="type"
           value="image"
           checked={radio === 'image'}
           onChange={handleRadioChange} />
        
        <label htmlFor="imageType">Image</label> 

        <input
           type="radio"
           id="blogType"
           name="type"
           value="blog"
           checked={radio === 'blog'}
           onChange={handleRadioChange} />
        
        <label htmlFor="blogType">Blog</label> 
        {/* explain above */}
        </div>

       {/* explain below */}
        {radio === 'video' && (
          <div>
            <label>Video Link: </label>
            <input  class="video"
            type="text" 
            name="video"
            id="video"
            value={file.video} 
            onChange={handleFileChange} />
          </div>
        )}

        {radio === 'image' && (
          <div>
            <label>Image Link: </label>
            <input class="image"
            type="text" 
            name="image"
            id="image"
            value={file.image} 
            onChange={handleFileChange} />
          </div>
        )}
        <div>
        <label>Comments: </label>
        <input
        type="text" 
        name="blog"
        id="blog"
        value={file.blog} 
        onChange={handleFileChange} />
        </div>

        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default Upload;

// const Upload = {};

// const [file, setFile] = useState(FileUpload);

// const handleFileChange = () => {
//   const { name, value } = e.target;
//   const fileToUpload = { ...file, [name]: value };
//   setFile(fileToUpload);
// };
// <input type="file" name="file" onChange={handleFileChange} />;
