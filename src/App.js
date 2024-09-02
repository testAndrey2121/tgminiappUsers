import React, { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [userData, setUserData] = useState(null);

  const tg = window.Telegram.WebApp

  useEffect(() => {
    tg.ready();

    const user = tg.initDataUnsafe?.user;
    if (user) {
      setUserData(user);
    }

    fetch(`http://localhost:3000/api/users`)
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const addUser = () => {
    fetch(`http://localhost:3000/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name })
    })
      .then((response) => response.json())
      .then((newUser) => setUsers([...users, newUser]));
  };

  const closeApp = () => {
    tg.close();
  };

  return (
    <div className="App">
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
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

      <button onClick={closeApp}>Close App</button>
    </div>
  );
}

export default App;
