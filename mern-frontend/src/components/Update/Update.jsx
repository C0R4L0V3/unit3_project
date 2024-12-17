import { useState } from 'react'
import './update.css'

const Update = ({ user, setUser, setPage}) => {
    const [file, setFile] = useState ({
        //model keys
        name: '',
        video: '',
        image: '',
        category: '',
        blog: '',
    });
    
    const [userConent, setUserContent] = useState(user.user.content || []) 
    const userId = user.user._id

    const handleFileChange = (e) => {
        setFile({...file, [e.target.id]: e.target.value })
        
    }

    const updateHandler = async (contentId) => {
        console.log(`trying to update post ${contentId}`);
        
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/content/${contentId}`,
                {   
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            if(res.ok) {
                const result = await res.json();
                console.log(result.mesage);
                //update the user state
                setUserContent((prevContent) =>
                    //map through previoud state
                    prevContent.filter((post) =>
                        //if the post._id matches the content id url, make a copy of the array else add post
                        post._id === contentId ? [...userConent, ] : post))
                alert('Post Updated')
             
            } else {
                console.log(contentId);
                console.error(`Failed to Update Post, ${res.statusText}`); 
            }
            
        } catch (error) {
            console.error(`Error encountered`, error.mesage);
            
        }

    }



    return (
        <div>
      <h1>Upload your content</h1>
      <form onSubmit={updateHandler}>
        {/* add more possible field to form and model */}
        <label>Cryptid Name</label>
        <input 
        type="text" 
        name="name"
        id="name"
        value={file.name} 
        onChange={handleFileChange} />
        <label>Video *Use Embeded Link*</label>
        <input 
        type="text" 
        name="video"
        id="video"
        value={file.video} 
        onChange={handleFileChange} />
        <label>Image</label>
        <input 
        type="text" 
        name="image"
        id="image"
        value={file.image} 
        onChange={handleFileChange} />
        <label>Comment</label>
        <input 
        type="text" 
        name="blog"
        id="blog"
        value={file.blog} 
        onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>

    )
}

export default Update