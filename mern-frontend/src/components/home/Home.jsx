import { useEffect } from "react"

const Home = ({content, setContent}) => {

        useEffect(() => {
            const fetchContent = async () => {
                try{
                    let res = await fetch(`${import.meta.env.VITE_API_URL}/index`);//gets content from all users
                    let JSONdata = await res.json()
                    console.log(JSONdata);
                    setContent(JSONdata)
                    
                } catch (error) {
                    console.error('Error fetching data');
                    
                }
            };
            fetchContent()

        },[]);

    return (
        <>
            <h1>Home Page!</h1>
            <div className="contentContainer">
                {content.length ? ( //Ternary Wrapper in case we have no content on the home page.
                content.map((post) => (//Map through fetchContent()
                <ul>
                     <li className = "postContainer" key={post._id}> {/* display posts. */}
                        <h3>Name: {post.name}</h3>
                        <p>{post.value}</p>
                        <p>{post.dateUploaded}</p>

                    </li>
                </ul>

                ))
            
        ) : (
            <p>Sorry something went wrong.  Fire the Devs.</p>
        )}
            </div>
        </>

    )
}

export default Home

