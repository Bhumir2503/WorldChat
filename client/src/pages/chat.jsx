import React from 'react';
import { Dropdown } from 'react-bootstrap';
import '../styles/chat.css'; // import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
export default function Chat() {
  return (
    <div className='Chat'>
      <nav className="navbar">
        <a className="navbar-brand" href="#">WorldChat</a>
        <Dropdown className='dropdown-button'>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            <img src="profile_picture_url" alt="" className="profile-picture"/>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/edit-profile">Edit Profile</Dropdown.Item>
            <Dropdown.Item href="#/signout">Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </nav>
      <div className="chat-container">
        <div className="users">
          <h2>Users</h2>
          {/* List of users here */}
        </div>
        <div className="chat-area">
          <h2>Chat Area</h2>
          {/* Chat messages here */}
        </div>
      </div>
    </div>
  );
}