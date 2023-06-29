import { FavSeenButton } from "../Buttons/FavSeenContainer";
import { getMovieYearFromTimeline } from "../Cards";
import {
  MovieCardsList,
  StyledMovieCard,
  StyledMovieTitle,
  StyledPhaseCard,
  StyledPhaseHeadline,
} from "../styling/MovieCardsStyling";
import { mcuPhases } from "../Phases";
import { motion } from "framer-motion";
import { StyledMovieImage } from "../styling/MovieCardsStyling";
import { useEffect, useState } from "react";
import FavoriteButton from "../Buttons/FavSeenContainer/ButtonFavorite";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SeenButton from "../Buttons/FavSeenContainer/ButtonSeen";

export const MoviesByPhases = ({ sortedMovies }) => {
  const [seenMovies, setSeenMovies] = useState([]);

  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem("watched")) || [];
    setSeenMovies(seen);
  }, []);

  const toggleSeen = (movieId) => {
    let updatedSeenMovies = [...seenMovies];
    if (updatedSeenMovies.includes(movieId)) {
      updatedSeenMovies = updatedSeenMovies.filter((id) => id !== movieId);
    } else {
      updatedSeenMovies.push(movieId);
    }
    setSeenMovies(updatedSeenMovies);
    localStorage.setItem("watched", JSON.stringify(updatedSeenMovies));
  };

  return (
    <MovieCardsList>
      {/* Rendere Filme für jede Phase */}
      {mcuPhases.map((phase, index) => (
        <StyledPhaseCard
          key={`PhaseCard${phase.phase}`}
          as={motion.div} // Verwende die motion.div-Komponente für die Animation
          initial={{ opacity: 0, y: -50 }} // Anfangszustand der Animation
          animate={{ opacity: 1, y: 0 }} // Animationszustand während der Animation
          exit={{ opacity: 0, y: -50 }} // Zustand der Animation beim Verlassen
          transition={{ delay: index * 0.2 }} // Verzögerung der Animation basierend auf dem Index
        >
          <div className="movies-container">
            <StyledPhaseHeadline
              as={motion.div}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.3 }}
            >
              Phase {phase.phase /* Automatisch generierte Phasennummer */}
            </StyledPhaseHeadline>
            {sortedMovies
              .filter((movie) => {
                const releaseYear = new Date(movie.release_date).getFullYear();
                return (
                  releaseYear >= phase.startYear && releaseYear <= phase.endYear
                );
              })
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
                <StyledMovieCard
                  key={movie.id}
                  as={motion.div}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <FavSeenButton>
                    <FavoriteButton movieId={movie.id} />
                    <SeenButton
                      movieId={movie.id}
                      isSeen={seenMovies.includes(movie.id)}
                      toggleSeen={toggleSeen}
                    />
                  </FavSeenButton>
                  {/* Füge den FavoriteButton hinzu und übergebe die movieId */}
                  <Link href={`/movies/${encodeURIComponent(movie.id)}`}>
                    {/* Verlinke zur Detailseite des Films */}
                    <StyledMovieImage isSeen={seenMovies.includes(movie.id)}>
                      <Image
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.name}
                        height={300}
                        width={200}
                      />
                    </StyledMovieImage>
                    <StyledMovieTitle>
                      {movie.title} {getMovieYearFromTimeline(movie, 1)}{" "}
                      {/* Zeige den Filmtitel und das Jahr an, basierend auf der getMovieYearFromTimeline Funktion */}
                    </StyledMovieTitle>
                  </Link>
                </StyledMovieCard>
              ))}
          </div>
        </StyledPhaseCard>
      ))}
    </MovieCardsList>
  );
};
