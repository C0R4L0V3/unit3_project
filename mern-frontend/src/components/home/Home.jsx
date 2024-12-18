import './Home.css'
import { useEffect } from "react"

const Home = ({content, setContent}) => {

        useEffect(() => {
            const fetchContent = async () => {
                try{
                    let res = await fetch(`${import.meta.env.VITE_API_URL}/users/index`);//gets content from all users
                    let JSONdata = await res.json()
                    console.log(JSONdata);
                    setContent(JSONdata.displayContent)
                    
                } catch (error) {
                    console.error('Error fetching data');
                    
                }
            };
            fetchContent()

        },[]);

    return (
        <>
            <h1>Encyclopedia Chupacabra</h1>
            <div className="contentContainer">
                
                <ul>
                {content.length ? ( //Ternary Wrapper in case we have no content on the home page.
                content.map((post, index) => (//Map through fetchContent()
                     <li className = "postContainer" key={index}> {/* display posts. */}
                     <h2>{post.title}</h2>
                        <h3>Cryptid Name: {post.name}</h3>
                        {post.image!=='' && (<img src={post.image}/>)}
                        {post.video && (<iframe
                                    width="560"
                                    height="315"
                                    src={post.video}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>)}
                        <p>{post.blog}</p>       
                        <p>{post.dateUploaded}</p>

                    </li>
                    ))
            
                ) : (
                    <p>Sorry something went wrong.  Fire the Devs.</p>
                )}
                
                </ul>

                
            </div>
        </>

    )
}

export default Home

