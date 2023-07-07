import { FavSeenButton } from "../Buttons/FavSeenContainer";
import { getMovieYearFromTimeline } from "../Cards";
import {
  MovieCardsList,
  StyledMovieCard,
  StyledMovieTitle,
  StyledNoFavoritesHeadline,
} from "../styling/MovieCardsStyling";
import { motion } from "framer-motion";
import { StyledMovieImage } from "../styling/MovieCardsStyling";
import { useEffect, useState } from "react";
import FavoriteButton from "../Buttons/FavSeenContainer/ButtonFavorite";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SeenButton from "../Buttons/FavSeenContainer/ButtonSeen";

export const MoviesByChronologic = ({
  sortedMovies,
  updateFavouriteMoviesDisplay,
}) => {
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

  if (sortedMovies.length === 0) {
    return (
      <>
        <StyledNoFavoritesHeadline>
          Keine Favoriten vorhanden
        </StyledNoFavoritesHeadline>
      </>
    );
  }

  function showUpdatedFavoriteMovies() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(favorites);
  }

  return (
    <MovieCardsList
      as={motion.div}
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
          <FavSeenButton>
            <FavoriteButton
              movieId={movie.id}
              movieTitle={movie.title}
              updateFavouriteMoviesDisplay={updateFavouriteMoviesDisplay}
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
                {movie.title} {getMovieYearFromTimeline(movie, 2)}
              </StyledMovieTitle>
            </>
          </Link>
        </StyledMovieCard>
      ))}
    </MovieCardsList>
  );
};
