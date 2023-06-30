import { ButtonFav, ButtonFavStyle } from "./ButtonsStyle";
import { toast } from "react-toastify";
import { ProgressBar } from "react-toastify";
import { StyledToastContainer } from "..";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Star from "./star.svg";
import StarFilled from "./star-filled.svg";
import "react-toastify/dist/ReactToastify.css";

const CustomProgressBar = ({ progress }) => {
  return (
    <ProgressBar
      {...progress}
      className="Toastify__progress-bar--controlled"
    ></ProgressBar>
  );
};

const FavoriteButton = ({ movieId, movieTitle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      toast.info(`"${movieTitle}" wurde von den Favoriten entfernt`);
    } else {
      favorites.push(movieId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      toast.success(`"${movieTitle}" wurde als Favorit markiert`);
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <>
      <ButtonFav>
        <ButtonFavStyle onClick={toggleFavorite}>
          {isFavorite ? (
            <Image src={StarFilled} alt="Favorisiert" width={20} height={20} />
          ) : (
            <Image src={Star} alt="Nicht favorisiert" width={20} height={20} />
          )}
        </ButtonFavStyle>
      </ButtonFav>
      <StyledToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        progressClassName="Toastify__progress-bar--controlled"
        components={{ ProgressBar: CustomProgressBar }}
      />
    </>
  );
};

export default FavoriteButton;
