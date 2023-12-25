import React, { useState, useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, []); // Здесь убираем зависимость, чтобы код выполнялся при загрузке

  const fetchData = async () => {
    const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films', {
      method: 'GET',
      headers: {
        'X-API-KEY': 'e3dd75e6-26ab-4994-b7f0-bec5369c4898',
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    setMovies(data.items || []);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h1>Кинопоиск</h1>
      <input
        type="text"
        placeholder="Поиск фильмов"
        value={searchQuery}
        onChange={handleSearch}
      />
      <div>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.filmId}>
              <h2>{movie.nameRu}</h2>
              <p>{movie.description}</p>
              <img src={movie.posterUrlPreview} alt={movie.nameRu} />
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
