import { apikey } from "../../pages/_app";
import { LoadingStyle } from "../styling/LoadingStyling";
import { motion } from "framer-motion";
import {
  StyledMovieImageCard,
  StyledMovieImage,
  StyledMovieDescription,
  StyledMovieCards,
  StyledMovieCharactersList,
  StyledMovieCharacters,
  StyledHeadline,
  StyledImageWidth,
  StyledImageHeight,
  StyledMovieReview,
  StyledSquareIconImageWidth,
  StyledSquareIconImageHeight,
  StyledTaglineCard,
  StyledSquareIcon,
  StyledMovieReviewHeadline,
  StyledMovieCardReview,
} from "../styling/MovieDetailsStyling";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import ButtonGeneralStyle from "../Buttons/ButtonGeneralStyle";
import { ButtonGeneralContainer } from "../Buttons/ButtonGeneralContainer";
import SquareIcon from "./square-solid.svg";
import Starfilled from "./star-filled.svg";

// Funktion zum Abrufen der Daten von der URL, die Elemente aus der Antwort zurück gibt
const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Funktion zum Abrufen der Charaktere eines Films anhand der Film-ID
const fetchCharacters = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`
  );
  const data = await response.json();
  const mainCast = data.cast?.filter((cast) => cast.order <= 12) || [];
  return mainCast.map((cast) => ({
    character: cast.character,
    actor: cast.name,
  }));
};

const MovieDetails = () => {
  // Verwendung des useRouter-Hooks, um den aktuellen Router zu erhalten
  const router = useRouter();
  const { slug } = router.query;

  // Verwendung des useSWR-Hooks zum Abrufen der Film-Daten
  const { data: movie, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${slug}?api_key=${apikey}&language=de`,
    fetcher
  );

  // Zustandsvariable für die Charaktere des Films
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Funktion zum Abrufen der Charaktere des Films
    const fetchMovieCharacters = async () => {
      if (movie) {
        const movieCharacters = await fetchCharacters(movie.id);
        setCharacters(movieCharacters);
      }
    };

    fetchMovieCharacters();
  }, [movie]);

  // Wenn ein Fehler beim Laden auftritt, wird folgende Fehlermeldung angezeigt
  if (error) {
    return <LoadingStyle>Fehler beim Abrufen der Filmdetails.</LoadingStyle>;
  }

  // Loading Screen, wenn die Filmdetails geladen werden
  if (!movie) {
    return (
      <>
        {/* <LoadingStyle>
          <LoadingImage />
        </LoadingStyle>
        <LoadingStyle>Filmdetail werden geladen.</LoadingStyle> */}
      </>
    );
  }
  // Veröffentlichungsjahr des Films wird erzeugt
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  return (
    <>
      {/* Zurück-Button zur Startseite */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ delay: 0.5 }}
      >
        <Link href={`../..`}>
          <ButtonGeneralContainer>
            <ButtonGeneralStyle>Zurück zur Übersicht</ButtonGeneralStyle>
          </ButtonGeneralContainer>
        </Link>
      </motion.div>
      {/* Filmbild */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.1 }}
      >
        <StyledMovieCards>
          <StyledMovieImageCard>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.2 }}
            >
              <StyledMovieImage>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  width={StyledImageWidth}
                  height={StyledImageHeight}
                />
              </StyledMovieImage>
            </motion.div>
          </StyledMovieImageCard>
        </StyledMovieCards>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ delay: 0.2 }}
      >
        <StyledMovieCards>
          <StyledTaglineCard>
            {"„"}
            {movie.tagline}
            {"“ "}
          </StyledTaglineCard>
        </StyledMovieCards>{" "}
      </motion.div>
      {/* Filmbeschreibung */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <StyledMovieCards>
          <StyledMovieDescription>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.2 }}
            >
              <StyledHeadline>Beschreibung:</StyledHeadline>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.3 }}
            >
              {" "}
              {movie.overview}{" "}
            </motion.div>
          </StyledMovieDescription>
        </StyledMovieCards>
      </motion.div>
      {/* Liste der Charaktere */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <StyledMovieCards>
          <StyledMovieCharacters>
            <StyledHeadline>Charaktere:</StyledHeadline>
            {characters.map((character, index) => (
              <StyledMovieCharactersList key={index}>
                {character.character} ({character.actor})
              </StyledMovieCharactersList>
            ))}
          </StyledMovieCharacters>
        </StyledMovieCards>
      </motion.div>
      {/* Filmbewertung */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <Link
          href={`https://themoviedb.org/movie/${slug}/reviews`}
          target="_blank"
        >
          <StyledMovieCards>
            <StyledMovieCardReview>
              <StyledHeadline>Bewertung:</StyledHeadline>
              <StyledMovieReview>
                <Image
                  src={Starfilled}
                  alt={"star"}
                  width={StyledSquareIconImageWidth}
                  height={StyledSquareIconImageHeight}
                ></Image>{" "}
                {Math.round(movie.vote_average * 10) / 10} {" / 10 ("}
                {movie.vote_count}
                {")"}
              </StyledMovieReview>
              <StyledSquareIcon>
                {"Quelle: The Movie Database "}
                <Image
                  src={SquareIcon}
                  alt={"square-icon"}
                  width={StyledSquareIconImageWidth}
                  height={StyledSquareIconImageHeight}
                />
              </StyledSquareIcon>
            </StyledMovieCardReview>
          </StyledMovieCards>
        </Link>
      </motion.div>
    </>
  );
};

export default MovieDetails;
