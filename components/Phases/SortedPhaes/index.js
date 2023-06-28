export const MoviesByPhase = {
    mcuPhases.forEach((phase) => {
  const moviesInPhase = filteredMovies
    .filter((movie) => {
      const releaseYear = new Date(movie.release_date).getFullYear();
      return releaseYear >= phase.startYear && releaseYear <= phase.endYear;
    })
    .sort((a, b) => {
      const releaseYearA = new Date(a.release_date).getFullYear();
      const releaseYearB = new Date(b.release_date).getFullYear();
      return releaseYearA - releaseYearB;
    });

  sortedMoviesByPhase.push(...moviesInPhase);
});
}