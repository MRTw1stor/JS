import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (query = "") => {
    const url = query ? 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=' + query : 'https://kinopoiskapiunofficial.tech/api/v2.1/films/top';

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-API-KEY': 'e3dd75e6-26ab-4994-b7f0-bec5369c4898',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    setMovies(data.films || []);
  };

  const handleSearch = async (e) => {
    if (e.key === 'Enter') {
      fetchData(searchQuery);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      fetchData();
    }
  }, [searchQuery]);

  return (
    <div id="search">
      <div id="title">
        <span id="titletext">Кинопоиск</span>
      </div>
      <input
        id="searchfilm"
        type="text"
        placeholder="Поиск фильмов"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearch}
      />
      <div id="items">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div id="item" key={movie.filmId}>
              <div id="itemtext">
                <span id="text">{movie.nameRu}</span>
              </div>
              <img src={movie.posterUrlPreview} alt={movie.nameRu} />
              <div id="itemgenre">
                <span id="genre">{movie.genres.map(genre => genre.genre).join(', ')}</span>
              </div>
              <div id="itemopisanie">
                <span id="opisanie">{movie.description}</span>
              </div>
            </div>
          ))
        ) : (
          <p>Фильмы не найдены</p>
        )}
      </div>
    </div>
  );
}

export default App;