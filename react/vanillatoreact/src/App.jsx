// React: importamos hooks para estado y efectos
// En vanilla no importabas nada porque trabajabas directamente con el DOM
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // ===== ESTADO EN REACT =====
  // Vanilla equivalente:
  // let skip = 0;
  // let totalUsers = null;
  //
  // Pero en React, si algo cambia y afecta a la UI, mejor va en state.

  // React equivalente conceptual a "los usuarios que has ido metiendo en el contenedor"
  // En vanilla no existía un array persistente en la UI, ibas creando tarjetas con appendChild
  const [users, setUsers] = useState([]);

  // React equivalente a:
  // loadMoreBtn.disabled = true / false
  // y también al texto "Loading..."
  const [loading, setLoading] = useState(false);

  // React equivalente directo a:
  // let skip = 0;
  const [skip, setSkip] = useState(0);

  // React equivalente directo a:
  // let totalUsers = null;
  const [totalUsers, setTotalUsers] = useState(null);

  // ===== FUNCIÓN PRINCIPAL =====
  // Vanilla equivalente:
  // async function fetchUsers() { ... }
  const fetchUsers = async () => {
    // Vanilla equivalente:
    // loadMoreBtn.disabled = true;
    // loadMoreBtn.textContent = "Loading...";
    //
    // En React no tocamos el botón directamente.
    // Cambiamos el estado y el JSX decide cómo se ve.
    setLoading(true);

    try {
      // Vanilla equivalente:
      // const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
      //
      // Aquí usamos el estado "skip" en vez de una variable normal.
      const response = await fetch(
        `https://dummyjson.com/users?limit=10&skip=${skip}`
      );

      // Vanilla equivalente:
      // if (!response.ok) {
      //   throw new Error("No se pudieron cargar los usuarios");
      // }
      if (!response.ok) {
        throw new Error("Could not fetch users");
      }

      // Vanilla equivalente:
      // const data = await response.json();
      const data = await response.json();

      // Vanilla equivalente:
      // totalUsers = data.total;
      setTotalUsers(data.total);

      // ===== AQUI ESTÁ UNA DE LAS DIFERENCIAS MÁS IMPORTANTES =====
      // Vanilla:
      // data.users.forEach((user) => {
      //   const userCard = document.createElement("div");
      //   userCard.classList.add("user-card");
      //   userCard.innerHTML = `...`;
      //   userListContainer.appendChild(userCard);
      // });
      //
      // React:
      // no creamos tarjetas aquí.
      // Solo guardamos los usuarios en el estado.
      // Luego React los pintará con .map() en el return.
      setUsers((prevUsers) => [...prevUsers, ...data.users]);

      // Vanilla equivalente:
      // skip += limit;
      //
      // React usa el setter del estado
      setSkip((prevSkip) => prevSkip + 10);
    } catch (error) {
      // Vanilla equivalente:
      // console.error("Error al cargar usuarios:", error);
      console.error("Error fetching users:", error);
    } finally {
      // Vanilla equivalente:
      // loadMoreBtn.disabled = false;
      // loadMoreBtn.textContent = "Load More";
      //
      // En React otra vez no tocamos el DOM directamente.
      setLoading(false);
    }
  };

  // ===== CARGA INICIAL =====
  // Vanilla equivalente:
  // fetchUsers();
  //
  // Pero en React esto se hace con useEffect al montar el componente
  useEffect(() => {
    console.log("useEffect se ha ejecutado");
    fetchUsers();
  }, []);

  return (
    <>
      <header>
        <h1>User Profiles</h1>
      </header>

      <main>
        <div id="user-list-container">
          {users.map((user) => (
            <div key={user.id} className="user-card">
              <img src={user.image} alt={user.firstName} />
              <h3>
                {user.firstName} {user.lastName}
              </h3>
            </div>
          ))}
        </div>

        {/* Esto es solo visual/útil para ver que el estado cambia */}
        <p>Users loaded: {users.length}</p>

        <button
          id="load-more-btn"
          // Vanilla equivalente:
          // loadMoreBtn.addEventListener("click", fetchUsers);
          onClick={fetchUsers}

          // Vanilla equivalente:
          // loadMoreBtn.disabled = true / false;
          disabled={loading || (totalUsers !== null && users.length >= totalUsers)}
        >
          {/* Vanilla equivalente:
              loadMoreBtn.textContent = "Loading..."
              loadMoreBtn.textContent = "Load More"
              loadMoreBtn.textContent = "No more users"
          */}
          {loading
            ? "Loading..."
            : totalUsers !== null && users.length >= totalUsers
            ? "No more users"
            : "Load More"}
        </button>
      </main>
    </>
  );
}

export default App;