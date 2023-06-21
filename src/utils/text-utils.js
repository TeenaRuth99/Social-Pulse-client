export const capitalizeFirstLetter = (text) => {
  if (!text) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const capitalizeAllFirstLettersOfWords = (text) => {
  if (!text) {
    return text;
  }
  return text.split(" ").map(capitalizeFirstLetter).join(" ");
};
