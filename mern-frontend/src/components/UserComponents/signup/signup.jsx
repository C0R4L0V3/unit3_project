const SignUp = ({ formData, setFormData, setUser, setPage }) => {
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
      if (res.ok){
      const JSONdata = await res.json();
      console.log(JSONdata);
      setUser(JSONdata)
      setPage('Profile')
      }
      else {
        console.log('Error response not ok');
        
        
      }
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
          <label htmlFor="confirmPass">Confirm Password:</label>
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            value={formData.confirmPass}
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
