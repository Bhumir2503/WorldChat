import React, { useState } from 'react';

import '../styles/chat.css'; // import the CSS file

export default function Chat() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const sendMessage = event => {
    event.preventDefault();
    // Here you can add the code to send the message
    console.log(event.target.message.value);
    event.target.message.value = '';
  };


  return (
    <div className='Chat'>
      <nav className="navbar">
        <p className="navbar-brand">WorldChat</p>
        <div className="dropdown">
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="#/edit-profile">Edit Profile</a>
              <a href="#/signout">Sign Out</a>
            </div>
          )}
        </div>
      </nav>
      <div className="chat-container">
        <div className="users">
          <h2>Users</h2>
          {/* List of users here */}
        </div>
        <div className="chat-area">
        <h2>Chat Area</h2>
        <div className='messages'>
        {/* Chat messages here */}
        </div>
        <form onSubmit={sendMessage}>
          <input type="text" name="message" placeholder="Type a message" required />
          <button type="submit">Send</button>
        </form>
      </div>
      </div>
    </div>
  );
}