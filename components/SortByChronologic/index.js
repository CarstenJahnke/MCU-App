import { getMovieYearFromTimeline } from "../Cards";
import {
  MovieCardsList,
  StyledMovieCard,
  StyledMovieTitle,
} from "../styling/MovieCardsStyling";
import { motion } from "framer-motion";
import { StyledMovieImage } from "../styling/MovieDetailsStyling";
import FavoriteButton from "../Buttons/FavSeenContainer/ButtonFavorite";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SeenButton from "../Buttons/FavSeenContainer/ButtonSeen";

export const MoviesByChronologic = ({ sortedMovies }) => {
  return (
    <MovieCardsList
      as={motion.div} // Verwende die motion.div-Komponente für die Animation
      initial={{ opacity: 0, y: -50 }} // Anfangszustand der Animation
      animate={{ opacity: 1, y: 0 }} // Animationszustand während der Animation
      exit={{ opacity: 0, y: -50 }} // Zustand der Animation beim Verlassen
    >
      {sortedMovies.map((movie, index) => (
        <StyledMovieCard
          key={movie.id}
          as={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ delay: index * 0.2 }} // Verzögerung der Animation basierend auf dem Index
        >
          <FavoriteButton movieId={movie.id} />{" "}
          <SeenButton movieId={movie.id} />{" "}
          {/* Füge den FavoriteButton hinzu und übergebe die movieId */}
          <Link href={`/movies/${encodeURIComponent(movie.id)}`}>
            {" "}
            {/* Verlinke zur Detailseite des Films */}
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
                {movie.title} {getMovieYearFromTimeline(movie, 1)}{" "}
                {/* Zeige den Filmtitel und das Jahr an, basierend auf der getMovieYearFromTimeline Funktion */}
              </StyledMovieTitle>
            </>
          </Link>
        </StyledMovieCard>
      ))}
    </MovieCardsList>
  );
};
