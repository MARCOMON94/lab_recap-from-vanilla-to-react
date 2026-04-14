import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [totalUsers, setTotalUsers] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://dummyjson.com/users?limit=10&skip=${skip}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch users");
      }

      const data = await response.json();

      setUsers((prevUsers) => [...prevUsers, ...data.users]);
      setTotalUsers(data.total);
      setSkip((prevSkip) => prevSkip + 10);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>
        <h1>User Profiles</h1>
      </header>

      <main>
        <div id="user-list-container"></div>
        <p>Users loaded: {users.length}</p>
        <button id="load-more-btn">Load More</button>
      </main>
    </>
  );
}

export default App;