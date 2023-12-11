function formatImageLink(string) {
  const endIndex = string.indexOf('?');

  const newString = string.slice(0, endIndex);

  return newString;
};

function formatShort(string) {
  const startIndex = string.indexOf('images');
  const endIndex = string.indexOf('?');

  const newString = string.slice(startIndex, endIndex);

  return newString;
};

export { formatImageLink, formatShort };
