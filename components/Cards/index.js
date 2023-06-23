import Link from "next/link";
import useSWR from "swr";
import {
  StyledMovieCard,
  StyledMovieImage,
  StyledMovieTitle,
  MovieCardsList,
  StyledPhaseCard,
  StyledPhaseHeadline,
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

  // MCU-Phasen Veröffentlichungsjahre
  const mcuPhases = [
    { phase: 1, startYear: 2008, endYear: 2012 }, // Phase 1 hinzugefügt
    { phase: 2, startYear: 2013, endYear: 2015 }, // Phase 2 hinzugefügt
    { phase: 3, startYear: 2016, endYear: 2019 }, // Phase 3 hinzugefügt
    { phase: 4, startYear: 2020, endYear: 2022 }, // Phase 4 hinzugefügt
    { phase: 5, startYear: 2023, endYear: 2025 }, // Phase 5 hinzugefügt
    { phase: 6, startYear: 2026, endYear: 2028 }, // Phase 6 hinzugefügt
  ];

  // Filter and sort movies from 2008
  const filteredMovies = movies.filter(
    (movie) => new Date(movie.release_date).getFullYear() >= 2008
  );

  // Sort movies by phases
  const sortedMovies = [];
  mcuPhases.forEach((phase) => {
    const moviesInPhase = filteredMovies.filter((movie) => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      return releaseYear >= phase.startYear && releaseYear <= phase.endYear;
    });
    sortedMovies.push(...moviesInPhase);
  });

  return (
    <MovieCardsList>
      {mcuPhases.map((phase) => (
        <StyledPhaseCard key={`PhaseCard${phase.phase}`}>
          <div className="movies-container">
            <StyledPhaseHeadline>Phase {phase.phase}</StyledPhaseHeadline>
            {sortedMovies
              .filter((movie) => {
                const releaseYear = new Date(movie.release_date).getFullYear();
                return (
                  releaseYear >= phase.startYear && releaseYear <= phase.endYear
                );
              })
              .map((movie) => (
                <Link
                  href={`/movies/${encodeURIComponent(movie.id)}`}
                  key={movie.id}
                >
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
                      {movie.title} (
                      {new Date(movie.release_date).getFullYear()})
                    </StyledMovieTitle>
                  </StyledMovieCard>
                </Link>
              ))}
          </div>
        </StyledPhaseCard>
      ))}
    </MovieCardsList>
  );
};

export default MovieCards;
