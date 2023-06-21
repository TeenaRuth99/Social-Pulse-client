export const getHost = () => {
  if (window.location.hostname === "localhost") {
    return "https://agilisium.com";
  }
  return window.location.protocol + "//" + window.location.hostname;
};
