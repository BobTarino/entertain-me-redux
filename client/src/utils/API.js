
export const movieQuery = (key, genre) => {
    return fetch("https://api.themoviedb.org/3/discover/movie?api_key="
     + key + "&language=en-US&page=1&with_genres=" + genre)
};

export const tvQuery = (key, genre) => {
    return fetch("https://api.themoviedb.org/3/discover/tv?api_key="
    + key + "&language=en-US&with_genres=" + genre)
};

export const gameQuery = (key, genre, platform) => {
    return fetch("https://api.rawg.io/api/games?key=" + key
    + "&genres=" + genre + "&parent_platforms=" + platform);
};

export const testVideo = (title) => {
    return fetch("https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q="
    + title + "&key=" + api_key);
}; 


