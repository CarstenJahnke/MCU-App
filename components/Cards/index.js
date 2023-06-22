import useSWR from "swr";
import {
  StyledMovieCard,
  StyledMovieImage,
  StyledMovieTitle,
  MovieCardsList,
} from "../styling/MovieCardsStyling";
import { apiKey } from "../../.api-key";
import Image from "next/image";

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
    <MovieCardsList>
      {movies.map((movie) => (
        <StyledMovieCard key={movie.id}>
          <StyledMovieImage key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.name}
              width={200}
              height={300}
            />
          </StyledMovieImage>
          <StyledMovieTitle>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </StyledMovieTitle>
        </StyledMovieCard>
      ))}
    </MovieCardsList>
  );
};

export default MovieCards;
