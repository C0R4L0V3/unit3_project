import "./Navbar.css";

const Navbar = ({ handleNav, user }) => {
  return (
    <div className="navbar">
      {/* If the user is not logged in, show the login/signup state */}
      {!user ? (
        <div className="navbarBlock">
          <div className="logSignBlock">
            <a onClick={() => handleNav("Login")} className="logSign">
              Login
            </a>
            <a onClick={() => handleNav("Signup")} className="logSign">
              Sign Up
            </a>
          </div>
          <div className="navbarLinks">
            <a onClick={() => handleNav("Home")} className="navLink">
              Home
            </a>
          </div>
        </div>
      ) : (
        <div className="navbarBlock">
          <div className="logSignBlock">
            <a onClick={() => handleNav("Logout")} className="logSign">
              Log Out
            </a>
          </div>
          <div className="navbarLinks">
            <a onClick={() => handleNav("Home")} className="navLink">
              Home
            </a>
            <a onClick={() => handleNav("Profile")} className="navLink">
              Profile
            </a>
            <a onClick={() => handleNav("Upload")} className="navLink">
              Upload
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
