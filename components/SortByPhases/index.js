import {
  MovieCardsList,
  StyledMovieCard,
  StyledMovieTitle,
  StyledPhaseCard,
  StyledPhaseHeadline,
} from "../styling/MovieCardsStyling";
import { mcuPhases } from "../Phases";
import { StyledMovieImage } from "../styling/MovieDetailsStyling";
import FavoriteButton from "../FavoriteButton/FavButton";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { getMovieYearFromTimeline } from "../Cards";

export const MoviesByPhases = ({ sortedMovies }) => {
  return (
    <MovieCardsList>
      {/* Render movies for each phase */}
      {mcuPhases.map((phase, index) => (
        <StyledPhaseCard
          key={`PhaseCard${phase.phase}`}
          as={motion.div} // Use the motion.div component for animation
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ delay: index * 0.2 }} // Delay in seconds
        >
          <div className="movies-container">
            <StyledPhaseHeadline
              as={motion.div} // Use the motion.div component for animation
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: index * 0.3 }} // Delay in seconds
            >
              Phase {phase.phase /* Automatically generated phase number */}
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
                  <FavoriteButton movieId={movie.id} />
                  {/* Add FavoriteButton */}
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
                      {movie.title} {getMovieYearFromTimeline(movie, 1)}
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
