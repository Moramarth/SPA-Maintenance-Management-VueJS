export const formatDate = function (dateAsString) {
  const year = dateAsString.slice(0, 4);
  const month = dateAsString.slice(5, 7);
  const day = dateAsString.slice(8, 10);

  return `${day}-${month}-${year}`;
};
