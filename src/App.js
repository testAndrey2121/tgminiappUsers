import React, { useEffect, useState } from 'react';
import ConnectWithTg from './ConnectWithTg';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const addUser = () => {
    if (!userData) {
      alert("User data not available. Unable to add user.");
      return;
    }

    fetch(`http://localhost:3000/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, creatorId: userData.id })
    })
      .then((response) => response.json())
      .then((newUser) => setUsers([...users, newUser]));
  };

  const handleUserData = (user) => {
    setUserData(user);
  };

  const handleTelegramData = (data) => {
    console.log("Received data from Telegram:", data);
  };

  useEffect(() => {
    if (window.Telegram) {
      const tg = window.Telegram.WebApp;

      tg.onEvent("mainButtonClicked", () => {
        handleTelegramData("Main button clicked");
      });

      tg.onEvent("data", (data) => {
        handleTelegramData(data);
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} (Created by: User ID {user.creatorId})
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={addUser}>Add User</button>

      {userData && (
        <div className="user-info">
          <h2>User Info</h2>
          <p><strong>ID:</strong> {userData.id}</p>
          <p><strong>First Name:</strong> {userData.first_name}</p>
          <p><strong>Last Name:</strong> {userData.last_name}</p>
          <p><strong>Username:</strong> {userData.username}</p>
        </div>
      )}

      <ConnectWithTg onUserData={handleUserData} />
    </div>
  );
}

export default App;
