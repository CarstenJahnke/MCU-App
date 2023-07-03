import { ButtonFav, ButtonFavStyle } from "./ButtonsStyle";
import { ProgressBar } from "react-toastify";
import { StyledToastContainer } from "../../../ToastifyMessage/styling";
import { toast } from "react-toastify";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Star from "./star.svg";
import StarFilled from "./star-filled.svg";

// Benutzerdefinierte Fortschrittsbalken-Komponente
const CustomProgressBar = ({ progress }) => {
  return (
    <ProgressBar
      {...progress}
      className="Toastify__progress-bar--controlled"
    ></ProgressBar>
  );
};

// FavoriteButton-Komponente
const FavoriteButton = ({ movieId, movieTitle }) => {
  // Zustand für den Favoriten-Status
  const [isFavorite, setIsFavorite] = useState(false);

  // Effekt-Hook, der den Favoriten-Status aktualisiert
  useEffect(() => {
    // Abrufen der gespeicherten Favoriten aus dem localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    // Überprüfen, ob die movieId in den Favoriten enthalten ist
    setIsFavorite(favorites.includes(movieId));
  }, [movieId]);

  // Funktion zum Umschalten des Favoriten-Status
  const toggleFavorite = () => {
    // Abrufen der gespeicherten Favoriten aus dem localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      // Entfernen der movieId aus den Favoriten
      const updatedFavorites = favorites.filter((id) => id !== movieId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      toast.warning(`"${movieTitle}" wurde von den Favoriten entfernt`);
    } else {
      // Hinzufügen der movieId zu den Favoriten
      favorites.push(movieId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      toast.success(`"${movieTitle}" wurde als Favorit markiert`);
    }

    // Aktualisieren des Favoriten-Status
    setIsFavorite(!isFavorite);
  };

  // Render-Methode der Komponente
  return (
    <>
      <ButtonFav>
        <ButtonFavStyle onClick={toggleFavorite}>
          {isFavorite ? (
            // Anzeigen des gefüllten Stern-Symbols, wenn isFavorite true ist
            <Image src={StarFilled} alt="Favorisiert" width={20} height={20} />
          ) : (
            // Anzeigen des leeren Stern-Symbols, wenn isFavorite false ist
            <Image src={Star} alt="Nicht favorisiert" width={20} height={20} />
          )}
        </ButtonFavStyle>
      </ButtonFav>
      {/* Konfiguration des Toastify-Containers */}
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
