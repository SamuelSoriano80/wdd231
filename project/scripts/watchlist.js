document.addEventListener("DOMContentLoaded", () => {
    displayWatchlist();
    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last updated: " + document.lastModified;

    function displayWatchlist() {
        const container = document.getElementById("watchlistResults");
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (watchlist.length === 0) {
            container.innerHTML = "<p>Your watchlist is empty.</p>";
            return;
        }

        watchlist.forEach(movie => {
            const card = document.createElement("div");
            card.className = "movie-card";

            card.innerHTML = `
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}"
                 alt="${movie.Title} Poster"
                 loading="lazy" />
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                
            </div>
        `;

            container.appendChild(card);

            const modal = document.getElementById("signupModal");
            const openBtn = document.getElementById("openModalBtn");
            const closeBtn = document.getElementById("closeModalBtn");

            openBtn.addEventListener("click", () => modal.showModal());
            closeBtn.addEventListener("click", () => modal.close());
        });
    }
});

const params = new URLSearchParams(window.location.search);
const formDataList = document.getElementById("formDataList");

if (params.has("name")) {
    formDataList.innerHTML = `
        <li><strong>Name:</strong> ${params.get("name")}</li>
        <li><strong>Email:</strong> ${params.get("email")}</li>
        <li><strong>Username:</strong> ${params.get("username")}</li>
        <li><strong>Favorite Genre:</strong> ${params.get("genre") || "Not provided"}</li>
      `;
} else {
    formDataList.innerHTML = `<li>No form data submitted.</li>`;
}