const getResultMessage = (score) => {
  if (score === 0) {
    return "Du weißt nichts";
  } else if (score >= 1 && score <= 3) {
    return "Du solltest mehr MCU Filme schauen";
  } else if (score >= 4 && score <= 6) {
    return "Da geht noch was!";
  } else if (score >= 7 && score <= 9) {
    return "Fast!";
  } else if (score === 10) {
    return "Du bist ein echter Nerd!";
  }
};

export default getResultMessage;
