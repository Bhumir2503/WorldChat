import { useContext, useState } from 'react';
import '../styles/login.css';
import UserContextObject from '../UserContext';
// import your API or context here
const { UserContext } = UserContextObject;

function Login() {
  const serverUrl = "http://localhost:3000";
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);




  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(serverUrl.concat('/login'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
      credentials: "include",
    });
  
    if (response.ok) {
      // handle successful login
      console.log("Login successful!")
      const data = await response.json(); // convert response to JSON
      setLoggedInUsername(username);
      setId(data.id) // access id from data, not response

    } 
    else {
      const data = await response.json();
      if (data.error === 'Invalid username or password' || data.error === 'Wrong password') {
        alert("Invalid username or password");
      } else {
        console.log(data.error)
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