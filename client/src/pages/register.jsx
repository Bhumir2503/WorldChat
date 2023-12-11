import { useContext, useState } from "react";
import "../styles/register.css";
import UserContextObject from '../UserContext';

const { UserContext } = UserContextObject;

function Register() {
  const serverUrl = "http://localhost:3000";
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert("Passwords do not match!");
      return;
    }
    const response = await fetch(serverUrl.concat('/register'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),

      credentials: "include",
    });
  
    if (response.ok) {
      // handle successful registration
      console.log("Registration successful!")

      const data = await response.json(); // convert response to JSON
      setLoggedInUsername(username);
      setId(data.id) // access id from data, not response

    } 
    else {
      const data = await response.json();
      if (data.error === 'Username or email already in use') {
        alert("Username or email already in use");
      } else {
        // handle other errors
      }
    }
  }

  return (
    <>
    <div className="RegisterForm">
      <form onSubmit={handleSubmit}>
        <h1>WorldChat</h1>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="Confirm Password" />
        <button type="submit">Register</button>
        <div className="RegisterForm__login">
          <p className="RegisterForm__text">Already have an account?</p>
          <a href="/login" className="RegisterForm__link">Login</a>
        </div>
      </form>
    </div>
    </>
  );
}

export default Register;