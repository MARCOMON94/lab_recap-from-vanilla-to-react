const userListContainer = document.getElementById("user-list-container");
const loadMoreBtn = document.getElementById("load-more-btn");


let skip = 0;
const limit = 10;
let totalUsers = null;

async function fetchUsers() {
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = "Loading...";

  try {
    console.log("ANTES de fetch, skip vale:", skip);

    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
      throw new Error("No se pudieron cargar los usuarios");
    }

    const data = await response.json();
    totalUsers = data.total;

    data.users.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");

      userCard.innerHTML = `
        <img src="${user.image}" alt="${user.firstName}" />
        <h3>${user.firstName} ${user.lastName}</h3>
      `;

      userListContainer.appendChild(userCard);
    });

    skip += limit;
    console.log("DESPUÉS de fetch, skip ahora vale:", skip);

    if (skip >= totalUsers) {
      loadMoreBtn.textContent = "No more users";
      loadMoreBtn.disabled = true;
      return;
    }
  } catch (error) {
    console.error("Error al cargar usuarios:", error);
    loadMoreBtn.textContent = "Error loading users";
  } finally {
    if (totalUsers === null || skip < totalUsers) {
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = "Load More";
    }
  }
}



fetchUsers();

loadMoreBtn.addEventListener("click", fetchUsers);