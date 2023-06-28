// Importieren der benötigten Abhängigkeiten und Komponenten
import React, { useState, useEffect } from "react";
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
import GlobalStyle from "../../styles";
import { mcuTimeline } from "../MCUTimeline";
import ButtonStyle from "../styling/ButtonStyling";
import { motion } from "framer-motion";
import FavoriteButton from "../FavoriteButton/FavButton";
import { mcuPhases } from "../Phases";
import LoadingScreen from "../LoadingScreen";

// Funktion zum Abrufen der Daten von der URL, die Elemente aus der Antwort zurück gibt
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

// Abrufen der Film-Daten mithilfe des useSWR-Hooks
const MovieCards = () => {
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/8258181?api_key=${apikey}&language=de`,
    fetcher
  );

  // Zustandsvariablen für
  const [sortOption, setSortOption] = useState(1); // Sortiermodus: 1 - Nach Phasen sortieren, 2 - Nach Chronologie sortieren
  const [isLoading, setIsLoading] = useState(true); // Ladezustand: true - Ladezustand, false - nicht im Ladezustand

  // Wird ausgeführt, wenn die Komponente geladen wird, um einen Ladescreen zu erzeugen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Wenn ein Fehler auftritt, wird eine Fehlermeldung angezeigt
  if (error) {
    return <p>Daten konnten nicht abgerufen werden.</p>;
  }
  // Zeigt den Ladezustand animiert an
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Filtern und Sortieren der Filme ab 2008
  const filteredMovies = movies
    ? movies.filter(
        (movie) => new Date(movie.release_date).getFullYear() >= 2008
      )
    : [];

  // Sortieren der Filme nach Phasen
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
      });

    sortedMoviesByPhase.push(...moviesInPhase);
  });

  // Sortieren der Filme chronologisch basierend auf der mcuTimeline
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
  });

  // Sucht das Jahr basierend auf der Sortieroption und der mcuTimeLine.js und gibt es zurück, falls gefunden.
  const getMovieYearFromTimeline = (movie, option) => {
    if (option === 1) {
      // Nach Phasen sortieren - Verwende Release-Jahr aus der API
      return `(${new Date(movie.release_date).getFullYear()})`;
    } else {
      // Nach Chronologie sortieren - Verwende Jahr aus mcuTimeLine.js
      const movieTitle = movie.title ? movie.title.toLowerCase() : "";
      const movieFromTimeline = mcuTimeline.find((m) =>
        movieTitle.includes(m.title.toLowerCase())
      );
      return movieFromTimeline ? `(${movieFromTimeline.year})` : "";
    }
  };

  // Sortieren der Filme basierend auf der gewählten Sortieroption
  let sortedMovies;
  if (sortOption === 1) {
    sortedMovies = sortedMoviesByPhase;
  } else {
    sortedMovies = sortedMoviesChronological;
  }

  return (
    // ToggleButton, welcher die Filme nach Phasen- oder nach Chronologischer Reihenfolge sortiert
    <>
      <ButtonStyle onClick={() => setSortOption(sortOption === 1 ? 2 : 1)}>
        {sortOption === 1
          ? "Nach Chronologie sortieren"
          : "Nach Phasen sortieren"}
      </ButtonStyle>
      <GlobalStyle />
      {
        //
        // ###########################
        // Sortierte Filme nach Phasen
        // ###########################
        //
      }
      {sortOption === 1 ? (
        <MovieCardsList>
          {/* Filme für jede Phase rendern */}
          {mcuPhases.map((phase, index) => (
            <StyledPhaseCard
              key={`PhaseCard${phase.phase}`}
              as={motion.div} // Verwende die motion.div-Komponente zur Animation
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.2 }} // Verzögerung in Sekunden
            >
              <div className="movies-container">
                <StyledPhaseHeadline
                  as={motion.div} // Verwende die motion.div-Komponente zur Animation
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: index * 0.3 }} // Verzögerung in Sekunden
                >
                  Phase{" "}
                  {phase.phase /* Phasen Nummer wird automatisch erzeugt */}
                </StyledPhaseHeadline>
                {sortedMovies // Filme für jeden Film in der Phase rendern
                  .filter((movie) => {
                    const releaseYear = new Date(
                      movie.release_date
                    ).getFullYear();
                    return (
                      releaseYear >= phase.startYear &&
                      releaseYear <= phase.endYear
                    );
                  })
                  // Die gefilterte Phasenliste, wird nach dem Release Jahr sortiert
                  .sort((a, b) => {
                    const releaseYearMovieA = new Date(
                      a.release_date
                    ).getFullYear();
                    const releaseYearMovieB = new Date(
                      b.release_date
                    ).getFullYear();
                    return releaseYearMovieA - releaseYearMovieB;
                  })
                  .map((movie, index) => (
                    <>
                      {" "}
                      <StyledMovieCard
                        as={motion.div}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <FavoriteButton movieId={movie.id} />
                        {/* Hinzufügen des FavoriteButtons */}
                        <Link href={`/movies/${encodeURIComponent(movie.id)}`}>
                          <StyledMovieImage>
                            <Image
                              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                              alt={movie.name}
                              height={300}
                              width={200}
                            />
                          </StyledMovieImage>
                          <StyledMovieTitle>
                            {movie.title}{" "}
                            {getMovieYearFromTimeline(movie, sortOption)}
                          </StyledMovieTitle>
                        </Link>
                      </StyledMovieCard>
                    </>
                  ))}
              </div>
            </StyledPhaseCard>
          ))}
        </MovieCardsList>
      ) : (
        //
        // ################################
        // Sortierte Filme nach Chronologie
        // ################################
        //
        <MovieCardsList
          as={motion.div} // Verwende die motion.div-Komponente zur Animation
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          {sortedMovies.map((movie, index) => (
            <StyledMovieCard
              key={movie.id}
              as={motion.div}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.2 }}
            >
              <FavoriteButton movieId={movie.id} />
              <Link href={`/movies/${encodeURIComponent(movie.id)}`}>
                <>
                  <StyledMovieImage>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.name}
                      height={300}
                      width={200}
                    />
                  </StyledMovieImage>
                  <StyledMovieTitle>
                    {movie.title} {getMovieYearFromTimeline(movie, sortOption)}
                  </StyledMovieTitle>
                </>
              </Link>
            </StyledMovieCard>
          ))}
        </MovieCardsList>
      )}
    </>
  );
};

export default MovieCards;
