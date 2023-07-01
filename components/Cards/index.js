import { apikey } from "../../pages/_app";
import { mcuPhases } from "../Phases";
import { mcuTimeline } from "../MCUTimeline";
import { MoviesByPhases } from "../SortByPhases";
import { MoviesByChronologic } from "../SortByChronologic";
import { StyledText } from "../styling/MovieDetailsStyling";
import ButtonSortStyle from "../Buttons/ButtonSort";
import GlobalStyle from "../../styles";
import LoadingScreen from "../LoadingScreen";
import React, { useState, useEffect } from "react";
import useSWR from "swr";

// Funktion zum Abrufen der Daten von der API
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

// Funktion zum Abrufen des Jahres eines Films basierend auf der Option (1 für Release-Jahr, 2 für chronologisches Jahr)
export const getMovieYearFromTimeline = (movie, option) => {
  if (option === 1) {
    return `(${new Date(movie.release_date).getFullYear()})`;
  } else {
    const movieTitle = movie.title ? movie.title.toLowerCase() : "";
    const movieFromTimeline = mcuTimeline.find((movie) =>
      movieTitle.includes(movie.title.toLowerCase())
    );
    return movieFromTimeline ? `(${movieFromTimeline.year})` : "";
  }
};

const MovieCards = () => {
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/8258181?api_key=${apikey}&language=de`,
    fetcher
  );

  const [sortOption, setSortOption] = useState(1); // Zustand zur Speicherung der Sortierungsoption (1 für Phasen, 2 für chronologisch)
  const [isLoading, setIsLoading] = useState(true); // Zustand zur Speicherung des Ladezustands

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simuliere eine Ladezeit von 1 Sekunde

    return () => clearTimeout(timer); // Bereinige den Timer beim Entfernen der Komponente
  }, []);

  if (error) {
    return <StyledText>Daten konnten nicht abgerufen werden.</StyledText>; // Zeige eine Fehlermeldung, wenn ein Fehler auftritt
  }

  if (isLoading) {
    return <LoadingScreen />; // Zeige einen Ladescreen, solange die Daten geladen werden
  }

  const filteredMovies = movies
    ? movies.filter(
        (movie) => new Date(movie.release_date).getFullYear() >= 2008
      ) // Filtere die Filme basierend auf dem Veröffentlichungsjahr (ab 2008)
    : [];

  const sortedMoviesByPhase = [];
  mcuPhases.forEach((phase) => {
    const moviesInPhase = filteredMovies
      .filter((movie) => {
        const releaseYear = new Date(movie.release_date).getFullYear();
        return releaseYear >= phase.startYear && releaseYear <= phase.endYear;
      })
      .sort((a, b) => {
        const releaseYearA = new Date(a.release_date).getFullYear();
        const releaseYearB = new Date(b.release_date).getFullYear();
        return releaseYearA - releaseYearB;
      }); // Sortiere die Filme innerhalb der Phase nach Release-Jahr

    sortedMoviesByPhase.push(...moviesInPhase);
  });

  const sortedMoviesChronological = sortedMoviesByPhase.sort((a, b) => {
    const movieATitle = a.title;
    const movieBTitle = b.title;

    const movieA = mcuTimeline.find((movie) =>
      movieATitle.includes(movie.title)
    );
    const movieB = mcuTimeline.find((movie) =>
      movieBTitle.includes(movie.title)
    );

    if (movieA && movieB) {
      return movieA.year.localeCompare(movieB.year);
    } else if (movieA) {
      return -1;
    } else if (movieB) {
      return 1;
    } else {
      return 0;
    }
  }); // Sortiere die Filme chronologisch basierend auf der mcuTimeline

  const sortedMovies =
    sortOption === 1 ? sortedMoviesByPhase : sortedMoviesChronological; // Verwende die entsprechend sortierten Filme basierend auf der Sortierungsoption

  return (
    <>
      <ButtonSortStyle onClick={() => setSortOption(sortOption === 1 ? 2 : 1)}>
        Nach {sortOption === 1 ? "Chronologisch" : "Phasen"} sortieren
      </ButtonSortStyle>
      {sortOption === 1 ? (
        <MoviesByPhases sortedMovies={sortedMovies} />
      ) : (
        <MoviesByChronologic sortedMovies={sortedMovies} />
      )}
      <GlobalStyle />
    </>
  );
};

export default MovieCards;
