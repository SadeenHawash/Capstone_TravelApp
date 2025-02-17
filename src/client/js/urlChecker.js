function checkForUrl(url) {
  const urlPattern =
    /^(https?:\/\/)([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})([\/\w.-]*)*\/?$/;
  return urlPattern.test(url);
}

export { checkForUrl };
