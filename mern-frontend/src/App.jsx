import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar.jsx";
// import Home from './components/home/Home.jsx'
// import Header from './components/header/Header.jsx'
import Footer from "./components/footer/Footer.jsx";

const formData = function App() {
  const [page, setPage] = useState("Home");
  const [content, setContent] = useState([]);
  const [user, setUser] = useState(null);
  const [formdata, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleNav = (page) => {
    console.log(page);
    if (page === "Logout") setUser(null); // this should log out the user
  };

  return (
    <>
      {/*     
      {page === 'Landing' ? <Landing /> : ''}
      {page === 'Signup' ? <Signup user={user} setUser={setUser}/> : ''}
      {page === 'Login' ? <Login  user={user} setUser={setUser}/> : ''} */}
      {/* {page === 'Home' ? <Home content={content} setContent={setContent}/> : ''} */}
      {/* {page === 'Upload' ? <Upload content={content} setContent={setContent}/> : ''} */}
      {/* {page == 'Profile' ? <Profile content={content} setContent={setContent}/> : ''} */}
      {/* <Header /> */}
      <Navbar handleNav={handleNav} user={user} />{" "}
      {/* passing handler to set page state // passing user state to determine how the nave bar looks*/}
      <Footer />
    </>
  );
};

export default App;
