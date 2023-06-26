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

// Funktion zum Abrufen der Daten von der URL, die Elemente aus der Antwort zurück gibt
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.items;
};

const MovieCards = () => {
  // Zustandsvariablen für den Ladezustand und den ersten Ladezustand
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // Abrufen der Film-Daten mithilfe des useSWR-Hooks
  const { data: movies, error } = useSWR(
    `https://api.themoviedb.org/3/list/12179?api_key=${apikey}&language=de`,
    fetcher
  );

  // Wird einmalig ausgeführt, wenn die Komponente geladen wird um einen Ladescreen zu erzeugen
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsFirstLoad(false);
    }, 1000);

    // Bereinigt den Timer, wenn die Komponente demontiert wird
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
        <LoadingStyle>
          <LoadingImage />
        </LoadingStyle>
        <LoadingStyle>Arc-Reaktor wird aufgeladen... </LoadingStyle>
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
  const filteredMovies = movies.filter(
    (movie) => new Date(movie.release_date).getFullYear() >= 2008
  );

  // Sortieren der Filme nach Phasen
  const sortedMovies = [];
  mcuPhases.forEach((phase) => {
    const moviesInPhase = filteredMovies.filter((movie) => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      return releaseYear >= phase.startYear && releaseYear <= phase.endYear;
    });
    sortedMovies.push(...moviesInPhase);
  });

  return (
    <>
      <GlobalStyle />
      <MovieCardsList>
        {/* Filme für jede Phase rendern */}
        {mcuPhases.map((phase) => (
          <StyledPhaseCard key={`PhaseCard${phase.phase}`}>
            <div className="movies-container">
              <StyledPhaseHeadline>Phase {phase.phase}</StyledPhaseHeadline>
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
    </>
  );
};

export default MovieCards;
