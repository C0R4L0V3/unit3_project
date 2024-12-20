import { useState} from 'react'

import './Update.css'

const Update = ({ user, setUser, setPage, contentId }) => {
    
    // const { contentId } = useParams(); // this extracts the id from the URL
    // console.log("is this pulling the correct id?", contentId);
    
    // const [userConent, setUserContent] = useState(user.user.content || []) 
    const userId = user.user._id
    //made for simplifying
    const content = user.user.content
    
    // need this so i can keep unchanged 
    const originalContent = content.find((post) => String(post._id) === String(contentId))

    //set initial form state with exsisting content values
    const [file, setFile] = useState ({
        //model keys
        title: originalContent?.title || '',
        name: originalContent?.name || '',
        video: originalContent?.video,
        image: originalContent?.image,
        blog: originalContent?.blog || '',
    });
    
    const handleFileChange = (e) => {
        setFile({...file, [e.target.id]: e.target.value })
        
    }

    const updateHandler = async (e) => {
        e.preventDefault(); //prevent form submission reload
        console.log(`trying to update post ${contentId}`);
        
        try {
            //makes an object with only fields that are updated
            const updateContent = {};
             for (const key in file) {
                if (file[key] !== originalContent[key]) {
                    console.log('Original key', originalContent[key])
                    console.log('file key', file[key] );
                    
                    updateContent[key] = file[key]
                    console.log(updateContent);
                    
                }
             }
            
            const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/content/${contentId}`,
                {   
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(updateContent),
                }
            );
            if(res.ok) {
                const result = await res.json();
                console.log(result);
                //update the user content with new changes
                setUser((prevUser) => {
                    //map through  user content array
                    const updatedContent = prevUser.user.content.map((post) =>
                        //if the contetn id and url id matchs merge into the updated array, else add the unchanged content
                        post._id === contentId ? {...post, ...updateContent} : post)

                        //returning the updated user state
                        return {
                            ...prevUser,
                                user: { ...prevUser.user, content: updatedContent}
                        }
                })
                
                alert('Post Updated')
                setPage('Profile')
             
            } else {
                console.log(contentId);
                console.error(`Failed to Update Post, ${res.statusText}`); 
            }
            
        } catch (error) {
            console.error(`Error encountered`, error.message);
            
        }

    }



    return (
        <div>
      <h1>Edit your Content!</h1>
      <form onSubmit={updateHandler}>
        {/* add more possible field to form and model */}
        <label>Title</label>
        <input 
        type="text" 
        name="title"
        id="title"
        value={file.title} 
        onChange={handleFileChange} />

        <label>Cryptid Name</label>
        <input 
        type="text" 
        name="name"
        id="name"
        value={file.name} 
        onChange={handleFileChange} />
        {originalContent.video !== undefined && (
            <div>
                <label>Video *Use Embeded Link*</label>
                <input 
                type="text" 
                name="video"
                id="video"
                value={file.video} 
                onChange={handleFileChange} />
            </div>
        )}
        {originalContent.image !== undefined && (
            <div>
                <label>Image</label>
                <input 
                type="text" 
                name="image"
                id="image"
                value={file.image} 
                onChange={handleFileChange} />
            </div>
        )}

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