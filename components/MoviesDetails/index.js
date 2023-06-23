import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { apikey } from "../../pages/_app";
import Link from "next/link";
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
  StyledButton,
} from "../styling/MovieDetailsStyling";
import Image from "next/image";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchCharacters = async (movieId) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apikey}`
  );
  const data = await response.json();
  const mainCast = data.cast.filter((cast) => cast.order <= 12);
  return mainCast.map((cast) => ({
    character: cast.character,
    actor: cast.name,
  }));
};

const MovieDetails = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data: movie, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${slug}?api_key=${apikey}&language=de`,
    fetcher
  );

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchMovieCharacters = async () => {
      if (movie) {
        const movieCharacters = await fetchCharacters(movie.id);
        setCharacters(movieCharacters);
      }
    };

    fetchMovieCharacters();
  }, [movie]);

  if (error) {
    return <p>Fehler beim Abrufen der Filmdetails.</p>;
  }

  if (!movie) {
    return <p>Filmdetails werden geladen...</p>;
  }

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";

  return (
    <>
      <StyledMovieCards>
        <Link href={`../..`}>
          <StyledButton>zurück zur Startseite</StyledButton>
        </Link>
      </StyledMovieCards>
      <StyledMovieCards>
        <StyledMovieImageCard>
          <StyledMovieImage>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={StyledImageWidth}
              height={StyledImageHeight}
            />
          </StyledMovieImage>
        </StyledMovieImageCard>
      </StyledMovieCards>

      <StyledMovieCards>
        <StyledMovieDescription>
          <StyledHeadline>Beschreibung:</StyledHeadline>
          {movie.overview}
        </StyledMovieDescription>
      </StyledMovieCards>

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
      <StyledMovieCards>
        <StyledMovieReview>
          <StyledHeadline>Bewertungen:{movie.vote_count}</StyledHeadline>
        </StyledMovieReview>
      </StyledMovieCards>
    </>
  );
};

export default MovieDetails;
