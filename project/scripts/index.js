async function searchMovie() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = "";

    if (!query) return;

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=77a788cd&t=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.Response === "True") {
            const card = document.createElement('div');
            card.className = 'movie-card';

            card.innerHTML = `
                <img src="${data.Poster !== "N/A" ? data.Poster : 'placeholder.jpg'}" 
                     alt="${data.Title} Poster" 
                     loading="lazy" />
                <div class="movie-info">
                    <h3>${data.Title}</h3>
                    <p><strong>Year:</strong> ${data.Year}</p>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Plot:</strong> ${data.Plot}</p>
                    <button class="save-button">Save to Watchlist</button>
                </div>
            `;

            const saveButton = card.querySelector(".save-button");
            saveButton.addEventListener("click", () => saveToWatchlist(data));

            resultsContainer.appendChild(card);
        } else {
            resultsContainer.innerHTML = `<p>No movie found with that title.</p>`;
        }

    } catch (error) {
        console.error("Error fetching data:", error);
        resultsContainer.innerHTML = `<p>Error loading movie data.</p>`;
    }
}

function saveToWatchlist(movie) {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

    const exists = watchlist.some(item => item.imdbID === movie.imdbID);
    if (!exists) {
        watchlist.push(movie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert(`Saved "${movie.Title}" to your watchlist.`);
    } else {
        alert(`"${movie.Title}" is already in your watchlist.`);
    }
}

document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = "Last updated: " + document.lastModified;