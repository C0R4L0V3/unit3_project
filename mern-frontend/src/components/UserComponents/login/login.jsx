import { useState } from "react";
import "./login.css";
const Login = ({ user, setUser, formData, setFormData, setPage }) => {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const [err, setErr] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        //form data was wrapped in another obejct, which is causing an issue i think was ({formData})
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        const JSONdata = await res.json();
        // console.log(JSONdata);
        setUser(JSONdata);
        console.log(user);
        //the JSONdata is an object, and within that object is the user object hence user.user.content

        setPage("Profile");
      } else {
        const errorData = await res.json();
        console.error(
          "No Account Found",
          errorData.message || "Login Failed, pleaser try again"
        );
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <p>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </p>
        <p>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </p>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
