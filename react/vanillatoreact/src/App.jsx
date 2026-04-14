import { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [skip, setSkip] = useState(0);
  const [totalUsers, setTotalUsers] = useState(null);

  return (
    <>
      <header>
        <h1>User Profiles</h1>
      </header>

      <main>
        <div id="user-list-container"></div>
        <button id="load-more-btn">Load More</button>
      </main>
    </>
  );
}

export default App;