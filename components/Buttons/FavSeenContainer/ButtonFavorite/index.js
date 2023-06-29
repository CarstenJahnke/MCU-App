import { ButtonFav, ButtonFavStyle } from "./ButtonsStyle";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Star from "./star.svg";
import StarFilled from "./star-filled.svg";

const FavoriteButton = ({ movieId }) => {
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
    } else {
      favorites.push(movieId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <ButtonFav>
      <ButtonFavStyle onClick={toggleFavorite}>
        {isFavorite ? (
          <Image src={StarFilled} alt="Favorisiert" width={20} height={20} />
        ) : (
          <Image src={Star} alt="Nicht favorisiert" width={20} height={20} />
        )}
      </ButtonFavStyle>
    </ButtonFav>
  );
};

export default FavoriteButton;
