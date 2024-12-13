const Login = ({ userInputs, setUserInputs }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newUserInputs = { ...userInputs, [name]: value };
    setUserInputs(newUserInputs);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userInputs.username,
          password: userInputs.password,
        }),
      });

      const JSONdata = await res.json();
      console.log(JSONdata);
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
            value={userInputs.username}
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
