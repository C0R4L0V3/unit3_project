
const Navbar = ({ handleNav, user }) => {

    //if a user isnot logged in, show one state of 

    return (
        <>
        {/* if a user isnot logged in, show one navbar state as */}
              {/* Else if user is logged in, render Navbar state as */}
        {!user ? (
            <div className="navbarblock">
                <div className="logsignblock">
                    <a onClick={() => handleNav('Login')} id="logSign" >Login</a>
                    <a onClick={() => handleNav('Signup')} id="logSign" >Sign Up</a>
                </div>
                <div className="navbar">
                    <a onClick={() => handleNav('Home')} >Home</a>
                </div>
            </div>
        ) : (
            <div className="navbarblock">
                <div className="logsignblock">
                    <a onClick={() =>  handleNav('Logout')} id="logSign" >Log Out</a>
                </div>
                <div className="navbar">
                    <a onClick={() => handleNav('Home')} >Home</a>
                    <a onClick={() => handleNav('Profile')} >Profile</a>
                    <a onClick={() => handleNav('Upload')} >UpLoad</a>
                </div>
            </div>
            )}
        </>
             
    )
}

export default Navbar