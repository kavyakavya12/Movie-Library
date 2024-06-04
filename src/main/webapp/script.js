// Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let favoritesPopup = document.getElementById("favorites-popup");
let popupMessage = document.getElementById("popup-message");
let okBtn = document.getElementById("ok-btn");
let cancelBtn = document.getElementById("cancel-btn");
let favoritesList = document.getElementById("favorites-list");
let favoritesDiv = document.getElementById("favorites");
let showFavoritesBtn = document.getElementById("show-favorites-btn");

let currentMovie = null;
let currentAction = null;

// Clear localStorage on page load to start with an empty favorites list
window.onload = () => {
    localStorage.removeItem("favorites");
};

// Function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?s=${movieName}&apikey=${key}`;

    // If input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
    } else {
        // If input field is NOT empty
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                // If movies exist in database
                if (data.Response == "True") {
                    result.innerHTML = data.Search.map(movie => `
                        <div class="movie-item">
                            <img src=${movie.Poster} class="poster">
                            <h2>${movie.Title}</h2>
                            <button onclick="getMovieDetails('${movie.imdbID}')">View Details</button>
                        </div>
                    `).join('');
                } else {
                    // If movies do NOT exist in database
                    result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
                }
            })
            // If error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
            });
    }
};

// Function to fetch movie details by ID
let getMovieDetails = (id) => {
    let url = `http://www.omdbapi.com/?i=${id}&apikey=${key}`;

    fetch(url)
        .then((resp) => resp.json())
        .then((data) => {
            // If movie exists in database
            if (data.Response == "True") {
                currentMovie = data;
                result.innerHTML = `
                    <div class="info">
                        <img src=${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img src="star-icon.svg">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                    <button id="add-favorite-btn">Add to Favorites</button>
                `;

                // Add event listener to "Add to Favorites" button
                document.getElementById("add-favorite-btn").addEventListener("click", () => showPopup('add'));
            } else {
                // If movie does NOT exist in database
                result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
            }
        })
        // If error occurs
        .catch(() => {
            result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
        });
};

// Function to show popup notification
let showPopup = (action, movie = null) => {
    currentAction = action;
    if (action === 'add') {
        popupMessage.textContent = 'Movie added to favorites!';
    } else if (action === 'remove') {
        currentMovie = movie;
        popupMessage.textContent = 'Movie removed from favorites!';
    }
    favoritesPopup.classList.remove("hidden");
    okBtn.addEventListener("click", confirmAction);
    cancelBtn.addEventListener("click", hidePopup);
};

// Function to hide popup notification
let hidePopup = () => {
    favoritesPopup.classList.add("hidden");
    okBtn.removeEventListener("click", confirmAction);
    cancelBtn.removeEventListener("click", hidePopup);
};

// Function to confirm the action in popup
let confirmAction = () => {
    if (currentAction === 'add') {
        addToFavorites();
    } else if (currentAction === 'remove') {
        removeFromFavorites(currentMovie.imdbID);
    }
    hidePopup();
};

// Function to add movie to favorites
let addToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find(movie => movie.imdbID === currentMovie.imdbID)) {
        favorites.push(currentMovie);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
};

// Function to remove movie from favorites
let removeFromFavorites = (id) => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let index = favorites.findIndex(movie => movie.imdbID === id);
    if (index !== -1) {
        let removedMovie = favorites.splice(index, 1)[0];
        localStorage.setItem("favorites", JSON.stringify(favorites));
        displayFavorites();
        showPopup('remove', removedMovie);
    }
};

// Function to display favorite movies
let displayFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.length > 0) {
        favoritesList.innerHTML = favorites.map(movie => `
            <div class="movie-item">
                <img src=${movie.Poster} class="poster">
                <h2>${movie.Title}</h2>
                <div class="rating">
                    <img src="star-icon.svg">
                    <h4>${movie.imdbRating}</h4>
                </div>
                <div class="details">
                    <span>${movie.Rated}</span>
                    <span>${movie.Year}</span>
                    <span>${movie.Runtime}</span>
                </div>
                <div class="genre">
                    <div>${movie.Genre.split(",").join("</div><div>")}</div>
                </div>
                <h3>Plot:</h3>
                <p>${movie.Plot}</p>
                <h3>Cast:</h3>
                <p>${movie.Actors}</p>
                <button onclick="removeFromFavorites('${movie.imdbID}')">Remove from Favorites</button>
            </div>
        `).join('');
    } else {
        favoritesList.innerHTML = `<h3 class="msg">No favorites added yet.</h3>`;
    }
    favoritesDiv.classList.remove("hidden");
};

// Event listeners
searchBtn.addEventListener("click", getMovie);
showFavoritesBtn.addEventListener("click", displayFavorites);
