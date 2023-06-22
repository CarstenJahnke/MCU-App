import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Daten.");
  }
  const data = await response.json();
  return data.items;
};

const fetchCharacters = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=654d3bcf0d283c157613021b77554193`
  );
  if (!response.ok) {
    throw new Error("Fehler beim Abrufen der Charaktere.");
  }
  const data = await response.json();
  const mainCast = data.cast.filter((cast) => cast.order <= 12);
  return mainCast.map((cast) => ({
    character: cast.character,
    actor: cast.name,
  }));
};

const IndexPage = () => {
  const { data: movies, error } = useSWR(
    "https://api.themoviedb.org/3/list/1?api_key=654d3bcf0d283c157613021b77554193",
    fetcher
  );

  const [moviesWithCharacters, setMoviesWithCharacters] = useState([]);

  useEffect(() => {
    const addCharactersToMovies = async () => {
      if (movies) {
        const moviesWithChars = await Promise.all(
          movies.map(async (movie) => {
            const characters = await fetchCharacters(movie.id);
            return {
              ...movie,
              characters,
            };
          })
        );
        setMoviesWithCharacters(moviesWithChars);
      }
    };

    addCharactersToMovies();
  }, [movies]);

  if (error) {
    return <p>Daten konnten nicht abgerufen werden.</p>;
  }

  if (!moviesWithCharacters.length) {
    return <p>Lade...</p>;
  }

  // MCU-Phasen Veröffentlichungsjahre
  const mcuPhases = [
    { phase: 1, startYear: 2008, endYear: 2012 }, // Phase 1 hinzugefügt
    { phase: 2, startYear: 2013, endYear: 2015 }, // Phase 2 hinzugefügt
    { phase: 3, startYear: 2016, endYear: 2019 }, // Phase 3 hinzugefügt
    { phase: 4, startYear: 2020, endYear: 2022 }, // Phase 4 hinzugefügt
    { phase: 5, startYear: 2023, endYear: 2025 }, // Phase 5 hinzugefügt
    { phase: 6, startYear: 2026, endYear: 2028 }, // Phase 6 hinzugefügt
  ];

  const filteredMovies = moviesWithCharacters.filter((movie) => {
    const releaseYear = new Date(movie.release_date).getFullYear();
    return mcuPhases.some(
      (phase) => releaseYear >= phase.startYear && releaseYear <= phase.endYear
    );
  });

  const sortedMovies = filteredMovies.sort((a, b) => {
    const releaseDateA = new Date(a.release_date);
    const releaseDateB = new Date(b.release_date);
    return releaseDateA - releaseDateB;
  });

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {sortedMovies.map((movie) => (
        <div
          key={movie.id}
          style={{
            backgroundColor: "#f4f4f4",
            padding: "20px",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            width: "300px",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          />
          <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
          <p style={{ marginBottom: "5px" }}>
            Bewertungen: {movie.vote_average}
          </p>
          <p style={{ marginBottom: "5px" }}>
            Anzahl der Bewertungen: {movie.vote_count}
          </p>
          <p style={{ marginBottom: "5px" }}>Charaktere:</p>
          <ul
            style={{
              marginTop: "10px",
              marginBottom: "0",
              paddingLeft: "20px",
            }}
          >
            {movie.characters.map((character, index) => (
              <li key={index}>
                {character.character} ({character.actor})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default IndexPage;
