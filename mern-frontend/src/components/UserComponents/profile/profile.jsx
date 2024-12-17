import { useState, useEffect } from "react"

const Profile = ({ user, setPage }) => {
    //defualt to an empty array
    const [userContent, setUserContent] = useState(user.user.content || [])
    const userId = user.user._id
    
    //add use effect to refresh uplaoded list after upload
const fetchUserContent = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/content`);
        const JSONdata = await res.json()
    
        setUserContent(JSONdata.user.content || [])
        
    } catch (error) {
        console.error('Error fetching user data', error);
        
    }
}

useEffect(() => {
    console.log(user);
    fetchUserContent()
},[user]);

    //delete handler
    const deleteHandler = async (contentId) => {

        try {
            // delete from api
            let res = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/content/${contentId}`,
                {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                }
            }
        );
        if (res.ok) {
            const result = await res.json();
            console.log(result.message);
            //update the userConent state
            setUserContent((prevContent) => 
                prevContent.filter((post) => post._id !== contentId))

            alert('Content Deleted')
        } else {
            alert('Failed to Delete')
        }

        } catch (error) {
            console.error('Error deleteting content', error);
            
            
        }
    }

    return (
        <>
        <h1>User Page!</h1>
        <div className="ContentContainer">
            
            {userContent && userContent.length ? ( //Ternary Wrapper in case user has no content *prevents the code from breaking if userContent is undfined
            userContent.map((post, idx) => {//Map through user content
                //was getting an error on toLowercase doing this for a safety check
                const isImage = post.category && post.category.toLowerCase() === 'image';
                const isVideo = post.category && post.category.toLowerCase() === 'video'

                return (
                    <div key={post._id || idx}>
                        <h2>{post.title}</h2>
                        <h3>Name: {post.name}</h3>

                                <img src={post.image} alt={post.name} />
                           
                                {/* // must use the YouTube embed URL, which is designed for iframes */}
                                <iframe
                                    width="560"
                                    height="315"
                                    src={post.video}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                        
                                <p>{post.blog}</p>
                          

                            <p>{post.dateUploaded}</p>
                            <div>
                                <button type="button" onClick={() => setPage('Update')}>Edit</button>
                                <button type="button" onClick={() => deleteHandler(post._id)}>Delete</button>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p>
                    Looks like you haven't uploaded any content.  Click the + button to get started!
                </p>
            )}
            </div>     
        </>
    );   
};


export default Profile