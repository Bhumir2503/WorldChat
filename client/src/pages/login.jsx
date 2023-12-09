import { useState } from 'react';
import '../styles/login.css';
// import your API or context here

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
    try {
      // Call your API or context method to login
    } catch (error) {
      if (error.response && error.response.data) {
        // handle errors
      }
    }
  }

  return (
    <>
      <div className="LoginForm">
        <form onSubmit={handleSubmit}>
          <h1>WorldChat</h1>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Login</button>
          <div className="LoginForm__register">
            <p className="LoginForm__text">Don't have an account?</p>
            <a href="/register" className="LoginForm__link">Register</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;