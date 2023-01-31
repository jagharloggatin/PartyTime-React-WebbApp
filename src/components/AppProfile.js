import ENDPOINTS from 'Endpoints';
import React, { useEffect, useState } from 'react';
import { getRequest } from 'RequestService';

export default function AppProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const id = 5;

    async function fetchData() {
      const res = await getRequest(ENDPOINTS.getUser(id));
      console.log('här är mitt res', res);
      const data = await res.json();

      setUser(data);
    }
    fetchData();
  }, []);

  if (!user) {
    return <div>No user</div>;
  }

  return <div>{user.firstName}</div>;
}
