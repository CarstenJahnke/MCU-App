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
import { LoadingStyling } from "../styling/LoadingStyling";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

const MovieCards = () => {
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/12179?api_key=${apikey}&language=de`,
    fetcher
  );

  if (error) {
    return <p>Daten konnten nicht abgerufen werden.</p>;
  }

  if (!movies) {
    return <LoadingStyling>Filme werden geladen...</LoadingStyling>;
  }

  // Filter and sort movies from 2008
  const filteredMovies = movies.filter(
    (movie) => new Date(movie.release_date).getFullYear() >= 2008
  );

  filteredMovies.sort((a, b) => {
    const yearA = new Date(a.release_date).getFullYear();
    const yearB = new Date(b.release_date).getFullYear();
    if (yearA === 2008 && yearB === 2008) {
      // Sort by release date if both movies are from 2008
      const releaseDateA = new Date(a.release_date);
      const releaseDateB = new Date(b.release_date);
      return releaseDateA - releaseDateB;
    } else if (yearA === 2008) {
      // Prioritize the film from 2008 in const yearA
      return -1;
    } else if (yearB === 2008) {
      // Prioritize the film from 2008 in const yearB
      return 1;
    } else {
      // Sort by year of publication
      return yearA - yearB;
    }
  });

  return (
    <MovieCardsList>
      {filteredMovies.map((movie) => (
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
