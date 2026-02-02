const apiKey = 'YOUR_API_KEY';
const apiUrl = 'http://www.omdbapi.com/';

const searchInput = document.getElementById('searchInput');
const movieContainer = document.getElementById('movieContainer');

// Function to fetch and display default movies
function displayDefaultMovies() {
    // Default movie titles to fetch
    const defaultMovies = ['The Matrix', 'Inception', 'The Shawshank Redemption', 'The Godfather', 'Pulp Fiction'];

    defaultMovies.forEach(movieTitle => {
        fetch(`${apiUrl}?apikey=${apiKey}&t=${movieTitle}`)
            .then(response => response.json())
            .then(movie => {
                if (movie.Response === 'True') {
                    displayMovie(movie);
                }
            })
            .catch(error => {
                console.error('Error fetching movie:', error);
            });
    });
}

// Function to fetch and display movies based on search term
function searchMovies() {
    const searchTerm = searchInput.value.trim();
    
    // Clear previous search results
    movieContainer.innerHTML = '';

    // Fetch movie data from OMDb API
    fetch(`${apiUrl}?apikey=${apiKey}&s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                data.Search.forEach(movie => {
                    displayMovie(movie);
                });
            } else {
                const errorMessage = document.createElement('p');
                errorMessage.textContent = data.Error;
                movieContainer.appendChild(errorMessage);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Function to display a movie item
function displayMovie(movie) {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie');

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = movie.Title;

    const year = document.createElement('p');
    year.classList.add('year');
    year.textContent = movie.Year;

    const poster = document.createElement('img');
    poster.src = movie.Poster === 'N/A' ? 'https://via.placeholder.com/200x300' : movie.Poster;
    poster.alt = movie.Title;

    movieItem.appendChild(title);
    movieItem.appendChild(year);
    movieItem.appendChild(poster);

    movieContainer.appendChild(movieItem);
}

// Display default movies when the webpage loads
window.addEventListener('load', displayDefaultMovies);

// Add event listener to search input
searchInput.addEventListener('input', searchMovies);

