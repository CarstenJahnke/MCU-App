import Link from "next/link";
import useSWR from "swr";
import {
  StyledMovieCard,
  StyledMovieImage,
  StyledMovieTitle,
  MovieCardsList,
} from "../styling/MovieCardsStyling";
import Image from "next/image";
import { apikey } from "../../pages/_app";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

const MovieCards = () => {
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/1?api_key=${apikey}`,
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
        <Link href={`/movies/${encodeURIComponent(movie.id)}`} key={movie.id}>
          <StyledMovieCard>
            <StyledMovieImage>
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
        </Link>
      ))}
    </MovieCardsList>
  );
};

export default MovieCards;
