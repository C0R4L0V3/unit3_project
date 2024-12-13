const Login = ({ setUser, formData, setFormData }) => {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formData,
        }),
      });

      const JSONdata = await res.json();
      console.log(JSONdata);
      setUser(JSONdata);
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
            value={form.username}
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
            value={userInputs.password}
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
