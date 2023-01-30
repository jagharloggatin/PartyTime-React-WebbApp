import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://localhost:7215/users');
      const data = await response.json();
      setUsers(data);
    }
    fetchData();
  }, []);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.username}
          <p>{user.id}</p>
          <p>{user.firstName}</p>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
