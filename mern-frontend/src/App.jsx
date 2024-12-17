import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from './components/home/Home.jsx'
// import Header from './components/header/Header.jsx'
import Footer from "./components/footer/Footer.jsx";
import Login from "./components/UserComponents/login/login.jsx";
import Signup from "./components/UserComponents/signup/signup.jsx";
import Profile from "./components/UserComponents/profile/profile.jsx";
import Upload from "./components/upload/UploadFile.jsx"
import Update from "./components/Update/Update.jsx";

const App = () => {
// function App() {
  const [page, setPage] = useState("Home");
  const [content, setContent] = useState([]);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPass: "",
  });

  const handleNav = (page) => {
    console.log(page);
    setPage(page);
    if (page === "Logout") setUser(null); // this should log out the user
  };

  return (
    <>
         
      <Navbar handleNav={handleNav} user={user} />
      <br></br>
      {/* {page === 'Landing' ? <Landing /> : ''} */}
      {page === 'Signup' ? <Signup formData={formData} setFormData={setFormData} setUser={setUser} setPage={setPage}/> : ''}
      {page === 'Login' ? <Login  user={user} formData={formData} setFormData={setFormData} setUser={setUser} setPage={setPage}/> : ''} 
      {page === 'Home' ? <Home content={content} setContent={setContent}/> : ''}
      {page === 'Upload' ? <Upload user={user} setUser={setUser} setPage={setPage}/> : ''}
      {page === 'Profile' ? <Profile user={user}/> : ''}
      {page === 'Update' ? <Update user={user} setUser={setUser} setPage={setPage} /> : ''}
      {/* <Header /> */}
      {/* passing handler to set page state // passing user state to determine how the nave bar looks*/}
      <Footer />
    </>
  );
// };
};

export default App;
