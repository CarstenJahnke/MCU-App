import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

import Star from "./star.svg";
import StarFilled from "./star-filled.svg";
import { ButtonFav } from "./ButtonsStyle";

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

  const ButtonFavStyle = styled.button`
    text-align: center;
    background-image: linear-gradient(
      to bottom,
      #5a0000,
      #6b0804,
      #7d1405,
      #8f1f04,
      #a02b00
    );
    border-radius: 20px;
    box-shadow: 5px 10px 5px 0px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: center;
    margin-bottom: 5px;
    width: 50%;
    background: none;
  `;

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
