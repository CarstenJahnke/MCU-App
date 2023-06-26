import { apikey } from "../pages/_app";

export async function fetchMovies() {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/list/12179?api_key=${apikey}&language=de`
    );
    const data = await response.json();
    return data.items || []; // Rückgabe einer leeren Liste, wenn keine Daten vorhanden sind
  } catch (error) {
    console.error("Fehler beim Abrufen der Filme:", error);
    return []; // Rückgabe einer leeren Liste im Fehlerfall
  }
}
