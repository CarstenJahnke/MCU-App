import { FavSeenButton } from "../Buttons/FavSeenContainer";
import { getMovieYearFromTimeline } from "../Cards";
import {
  MovieCardsList,
  StyledMovieCard,
  StyledMovieTitle,
} from "../styling/MovieCardsStyling";
import { motion } from "framer-motion";
import { StyledMovieImage } from "../styling/MovieCardsStyling";
import { useEffect, useState } from "react";
import FavoriteButton from "../Buttons/FavSeenContainer/ButtonFavorite";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SeenButton from "../Buttons/FavSeenContainer/ButtonSeen";

// Komponente MoviesByChronologic
export const MoviesByChronologic = ({ sortedMovies }) => {
  // Zustandsvariablen
  const [seenMovies, setSeenMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  // Effekt-Hook zum Setzen der Zustandsvariablen basierend auf den im Local Storage gespeicherten Daten
  useEffect(() => {
    const seen = JSON.parse(localStorage.getItem("watched")) || [];
    setSeenMovies(seen);

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(favorites);
  }, []);

  // Funktion zum Umschalten des "gesehen"-Status eines Films
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

  // Funktion zum Umschalten des Favoritenstatus eines Films
  const toggleFavorite = (movieId) => {
    let updatedFavoriteMovies = [...favoriteMovies];
    if (updatedFavoriteMovies.includes(movieId)) {
      updatedFavoriteMovies = updatedFavoriteMovies.filter(
        (id) => id !== movieId
      );
    } else {
      updatedFavoriteMovies.push(movieId);
    }
    setFavoriteMovies(updatedFavoriteMovies);
    localStorage.setItem("favorites", JSON.stringify(updatedFavoriteMovies));
  };

  // Filtern der Filme basierend auf den Favoriten
  const filteredMovies = sortedMovies.filter((movie) =>
    favoriteMovies.includes(movie.id)
  );
  if (filteredMovies.length === 0) {
    return (
      <MovieCardsList>
        <p>Keine favorisierten Filme</p>
      </MovieCardsList>
    );
  }

  return (
    <>
      <MovieCardsList
        as={motion.div}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        {filteredMovies.map((movie, index) => (
          <StyledMovieCard
            key={movie.id}
            as={motion.div}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ delay: index * 0.2 }}
          >
            <FavSeenButton>
              <FavoriteButton
                movieId={movie.id}
                movieTitle={movie.title}
                isFavorite={favoriteMovies.includes(movie.id)}
                toggleFavorite={toggleFavorite}
              />
              <SeenButton
                movieId={movie.id}
                movieTitle={movie.title}
                isSeen={seenMovies.includes(movie.id)}
                toggleSeen={toggleSeen}
              />
            </FavSeenButton>
            <Link href={`/movies/${encodeURIComponent(movie.id)}`}>
              <>
                <StyledMovieImage isSeen={seenMovies.includes(movie.id)}>
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
              </>
            </Link>
          </StyledMovieCard>
        ))}
      </MovieCardsList>
    </>
  );
};
