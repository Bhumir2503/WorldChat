import React, { useEffect, useState, useContext} from 'react';
import UserContextObject from '../UserContext';
import '../styles/chat.css'; // import the CSS file

export default function Chat() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const[ws, setWs] = useState(null);

  const {UserContext} = UserContextObject;
  const {username, id, setUsername, setId} = useContext(UserContext);

  const [onlineUsers, setOnlineUsers] = useState({});


  const sendMessage = event => {
    event.preventDefault();
    // Here you can add the code to send the message
    console.log(event.target.message.value);
    event.target.message.value = '';
  };



  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:3000');
    setWs(websocket);
    websocket.addEventListener('message', handleMessage)
  }, []);


  function showOnlinePeople(peopleArray){

    const people = {}
    peopleArray.forEach(({userId, username}) => {
      people[userId] = username;
    
    })
    setOnlineUsers(people);
  }


  function handleMessage(e) {

    const message = JSON.parse(e.data);
    if('online' in message) {
      showOnlinePeople(message.online);
    }
  }

  const handleSignOut = () => {
    // Clear the username and id from context (or however you handle sign out)
    setUsername(null);
    setId(null);
  };

  return (
    <div className='Chat'>
      <div className="chat-container">
        <div className="users">
          <h2>{username}</h2>
          {Object.keys(onlineUsers).map((userId) => (
            <div className='contact' key={userId}>{onlineUsers[userId]}</div>
          ))}
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