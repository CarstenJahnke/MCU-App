import React, { useState, useEffect } from "react";

const FavoriteButton = ({ movieId }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Überprüfen, ob der Film bereits als Favorit markiert ist
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);

  // Funktion zum Hinzufügen/Entfernen des Films aus den Favoriten
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
    <button onClick={toggleFavorite}>
      {isFavorite ? (
        <img src="/star-filled.svg" alt="Favorisiert" />
      ) : (
        <img src="star.svg" alt="Nicht favorisiert" />
      )}
    </button>
  );
};

export default FavoriteButton;
