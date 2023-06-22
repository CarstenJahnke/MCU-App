import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { apikey } from "../../pages/_app";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchCharacters = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`
  );
  const data = await response.json();
  const mainCast = data.cast.filter((cast) => cast.order <= 12);
  return mainCast.map((cast) => ({
    character: cast.character,
    actor: cast.name,
  }));
};

const MovieDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: movie, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${slug}?api_key=${apikey}`,
    fetcher
  );

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchMovieCharacters = async () => {
      if (movie) {
        const movieCharacters = await fetchCharacters(movie.id);
        setCharacters(movieCharacters);
      }
    };

    fetchMovieCharacters();
  }, [movie]);

  if (error) {
    return <p>Fehler beim Abrufen der Filmdetails.</p>;
  }

  if (!movie) {
    return <p>Filmdetails werden geladen...</p>;
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>Jahr: {releaseYear}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <p>Beschreibung: {movie.overview}</p>
      <p>Charaktere:</p>
      <ul>
        {characters.map((character, index) => (
          <li key={index}>
            {character.character} ({character.actor})
          </li>
        ))}
      </ul>
      <p>Bewertungen:</p>
      {movie.ratings &&
        movie.ratings.map((rating, index) => (
          <li key={index}>
            {rating.source}: {rating.value}
          </li>
        ))}
    </div>
  );
};

export default MovieDetails;
