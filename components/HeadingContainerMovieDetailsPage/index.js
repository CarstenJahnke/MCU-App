import { useRouter } from "next/router";
import useSWR from "swr";
import { apikey } from "../../pages/_app";
import { HeadingStyledContainer } from "../styling/MovieDetailsStyling";
import { LoadingStyle } from "../styling/LoadingStyling";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const MovieTitle = ({ slug }) => {
  const { data: movie, error } = useSWR(
    `https://api.themoviedb.org/3/movie/${slug}?api_key=${apikey}&language=de`,
    fetcher
  );

  if (error) {
    return <LoadingStyle>Fehler beim Abrufen des Filmtitels.</LoadingStyle>;
  }

  if (!movie) {
    return <></>;
  }

  return (
    <HeadingStyledContainer>
      {movie.title} ({new Date(movie.release_date).getFullYear()})
    </HeadingStyledContainer>
  );
};

export default function HeadingContainer({ title }) {
  const router = useRouter();
  const { slug } = router.query;

  if (slug) {
    return <MovieTitle slug={slug} />;
  }

  return <HeadingStyledContainer>{title}</HeadingStyledContainer>;
}
