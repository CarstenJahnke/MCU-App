const getResultMessage = (score) => {
  if (score === 0) {
    return "😳 ähm.. bist du eher DC Fan? 😱";
  } else if (score >= 1 && score <= 3) {
    return "🚀 Intelligent wie Tony Stark 😎";
  } else if (score >= 4 && score <= 6) {
    return "🧬 So smart wie Shuri 👩🏾‍🔬";
  } else if (score >= 7 && score <= 9) {
    return "👀 Du verfolgst alles wie der Watcher! 🔮";
  } else if (score === 10) {
    return "👓 Stan Lee lebt in Dir! 👴🏻";
  }
};

export default getResultMessage;
