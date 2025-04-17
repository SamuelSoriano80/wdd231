document.addEventListener("DOMContentLoaded", () => {
    const allTitles = [
        "Inception", "The Matrix", "Interstellar", "The Dark Knight", "Forrest Gump", "Pulp Fiction", "The Godfather",
        "Fight Club", "The Shawshank Redemption", "The Avengers", "Titanic", "Gladiator", "The Lion King", "Joker",
        "Black Panther", "Avatar", "The Prestige", "Spider-Man", "The Social Network", "Whiplash", "Coco", "Dune",
        "The Grand Budapest Hotel", "The Batman", "La La Land"
    ];

    const randomTitles = allTitles.sort(() => 0.5 - Math.random()).slice(0, 15);

    const resultsContainer = document.getElementById('discoverResults');

    randomTitles.forEach(async (title) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=77a788cd&t=${encodeURIComponent(title)}`);
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

                card.querySelector(".save-button").addEventListener("click", () => saveToWatchlist(data));
                resultsContainer.appendChild(card);
            }
        } catch (error) {
            console.error(`Error fetching movie: ${title}`, error);
        }
    });

    function saveToWatchlist(movie) {
        let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

        if (!watchlist.some(m => m.Title === movie.Title)) {
            watchlist.push(movie);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
            alert(`${movie.Title} added to your watchlist!`);
        } else {
            alert(`${movie.Title} is already in your watchlist.`);
        }
    }

    document.getElementById("current-year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = "Last updated: " + document.lastModified;
});
