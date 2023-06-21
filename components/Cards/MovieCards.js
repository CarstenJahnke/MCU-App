import useSWR from "swr";
import {
  movieCardStyle,
  movieImageStyle,
  movieTitleStyle,
} from "../styling/MovieCardsStyling";
import { apiKey } from "../../.api-key/api";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

const MovieCards = () => {
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/1?api_key=${apiKey}`,
    fetcher
  );

  if (error) {
    return <p>Daten konnten nicht abgerufen werden.</p>;
  }

  if (!movies) {
    return <p>Filme werden geladen...</p>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      {movies.map((movie) => (
        <div key={movie.id} style={movieCardStyle}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
            alt={movie.title}
            style={movieImageStyle}
          />
          <h2 style={movieTitleStyle}>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h2>
        </div>
      ))}
    </div>
  );
};

export default MovieCards;
