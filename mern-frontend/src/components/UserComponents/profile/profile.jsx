import { useEffect } from "react"

const Profile = ({user, userContent, setUserContent}) => {

    useEffect(() => {
        const fetchUserContent = async () => {
        try {
            let res = await fetch(`${import.meta.env.VITE_API_URL}/users/${user._id}/content`);
            let JSONdata = await res.json()
            console.log(JSONdata);
            setUserContent(JSONdata)
            
        } catch (error) {
            console.error('Error fetching user data');
            
        }
    }
    fetchUserContent()
},[]);

    
    return (
        <>
        <h1>User Page!</h1>
        <div className="ContentContainer">
            {userContent.length? ( //Ternary Wrapper in case user has no content
            userContent.map((post) => (//Map through user content
                <div>
                    <h3>Name: {post.name}</h3>
                        <p>{post.value}</p>
                        <p>{post.dateUploaded}</p>
                </div>
            ))
            ) : ( 
                <p>Looks like you haven't uploaded any content.  Click the + button to get started!</p>
            )}
            
            </div>
        </>
    )
}


export default Profile