import React, { useState, useEffect } from 'react';
import ConnectWithTg from './ConnectWithTg';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);

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
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Language Code:</strong> {userData.languageCode}</p>
          <p><strong>Phone Number:</strong> {userData.phone_number || "Not available"}</p>
          <p><strong>Platform:</strong> {userData.platform}</p>
          <p><strong>Colors:</strong> {userData.colors}</p>
          <p><strong>Photo:</strong> <img src={userData.photoUrl} alt="User" style={{ width: '50px', height: '50px' }}/></p>
          <p><strong>Telegram Premium:</strong> {userData.isPremium ? "Yes" : "No"}</p>
        </div>
      )}

      <ConnectWithTg onUserData={handleUserData} />
    </div>
  );
}

export default App;
