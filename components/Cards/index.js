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
import { LoadingImage, LoadingStyle } from "../styling/LoadingStyling";
import GlobalStyle from "../../styles";
import { mcuTimeline } from "../MCUTimeline";
import ButtonStyle from "../styling/ButtonStyling";
import { motion } from "framer-motion";

// Funktion zum Abrufen der Daten von der URL, die Elemente aus der Antwort zurück gibt
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

const MovieCards = () => {
  // Zustandsvariablen für den Ladezustand, den ersten Ladezustand und die Sortieroption
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [sortOption, setSortOption] = useState(1); // 1: Nach Phasen sortiert, 2: Chronologisch sortiert

  // Abrufen der Film-Daten mithilfe des useSWR-Hooks
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/8258181?api_key=${apikey}&language=de`,
    fetcher
  );

  const [isFadeOut, setIsFadeOut] = useState(false);

  // Wird einmalig ausgeführt, wenn die Komponente geladen wird, um einen Ladescreen zu erzeugen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFirstLoad(true);
      setIsFadeOut(true); // Füge diese Zeile hinzu, um den Ladescreen auszublenden
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Setzt isFirstLoad zurück, wenn sich die Film-Daten ändern
  useEffect(() => {
    setIsFirstLoad(true);
  }, [movies]);

  // Wenn ein Fehler auftritt, wird eine Fehlermeldung angezeigt
  if (error) {
    return <p>Daten konnten nicht abgerufen werden.</p>;
  }

  // Zeigt den Ladezustand an
  if (isLoading && isFirstLoad) {
    return (
      <>
        <LoadingStyle
          as={motion.div}
          initial={{ opacity: 0 }} // Anfangszustand der Animation
          animate={{ opacity: 1 }} // Zustand, zu dem animiert werden soll
          transition={{ duration: 0.5 }} // Dauer der Animation
        >
          <LoadingImage />
        </LoadingStyle>
        <LoadingStyle
          as={motion.div}
          initial={{ opacity: 0 }} // Anfangszustand der Animation
          animate={{ opacity: 1 }} // Zustand, zu dem animiert werden soll
          transition={{ duration: 0.25 }} // Dauer der Animation
        >
          Arc-Reaktor wird geladen...
        </LoadingStyle>
      </>
    );
  }

  // MCU-Phasen Veröffentlichungsjahre
  const mcuPhases = [
    { phase: 1, startYear: 2008, endYear: 2012 },
    { phase: 2, startYear: 2013, endYear: 2015 },
    { phase: 3, startYear: 2016, endYear: 2019 },
    { phase: 4, startYear: 2020, endYear: 2022 },
    { phase: 5, startYear: 2023, endYear: 2025 },
    { phase: 6, startYear: 2026, endYear: 2028 },
  ];

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
    <>
      <ButtonStyle onClick={() => setSortOption(sortOption === 1 ? 2 : 1)}>
        {sortOption === 1
          ? "Nach Chronologie sortieren"
          : "Nach Phasen sortieren"}
      </ButtonStyle>
      <GlobalStyle />
      {sortOption === 1 ? (
        <MovieCardsList>
          {/* Filme für jede Phase rendern */}
          {mcuPhases.map((phase, index) => (
            <StyledPhaseCard
              key={`PhaseCard${phase.phase}`}
              as={motion.div}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.2 }} // Verzögerung basierend auf dem Index der Phase
            >
              <div className="movies-container">
                <StyledPhaseHeadline
                  as={motion.div}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: index * 0.3 }} // Verzögerung basierend auf dem Index der Phase
                >
                  Phase {phase.phase}
                </StyledPhaseHeadline>
                {/* Filme für jeden Film in der Phase rendern */}
                {sortedMovies
                  .filter((movie) => {
                    const releaseYear = new Date(
                      movie.release_date
                    ).getFullYear();
                    return (
                      releaseYear >= phase.startYear &&
                      releaseYear <= phase.endYear
                    );
                  })
                  .map((movie, index) => (
                    <Link
                      href={`/movies/${encodeURIComponent(movie.id)}`}
                      key={movie.id}
                    >
                      <StyledMovieCard
                        as={motion.div}
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ delay: index * 0.2 }}
                      >
                        <StyledMovieImage>
                          <Image
                            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                            alt={movie.name}
                            width={200}
                            height={300}
                          />
                        </StyledMovieImage>
                        <StyledMovieTitle>
                          {movie.title}{" "}
                          {getMovieYearFromTimeline(movie, sortOption)}
                        </StyledMovieTitle>
                        <span style={{ display: "none" }}>{index + 1}</span>
                      </StyledMovieCard>
                    </Link>
                  ))}
              </div>
            </StyledPhaseCard>
          ))}
        </MovieCardsList>
      ) : (
        <MovieCardsList
          as={motion.div} // Verwende die motion.div-Komponente anstelle von div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          {sortedMovies.map((movie, index) => (
            <Link
              href={`/movies/${encodeURIComponent(movie.id)}`}
              key={movie.id}
            >
              <StyledMovieCard
                as={motion.div}
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ delay: index * 0.2 }}
              >
                <StyledMovieImage>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.name}
                    width={200}
                    height={300}
                  />
                </StyledMovieImage>
                <StyledMovieTitle>
                  {movie.title} {getMovieYearFromTimeline(movie, sortOption)}
                </StyledMovieTitle>

                <span style={{ display: "none" }}>{index + 1}</span>
              </StyledMovieCard>
            </Link>
          ))}
        </MovieCardsList>
      )}
    </>
  );
};

export default MovieCards;
