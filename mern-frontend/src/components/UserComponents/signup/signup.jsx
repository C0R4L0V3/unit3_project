const SignUp = ({ formData, setFormData }) => {
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const JSONdata = await res.json();
      console.log(JSONdata);
    } catch (error) {
      console.error("Error signing up", error);
    }
  };

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
        <p>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </p>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignUp;
