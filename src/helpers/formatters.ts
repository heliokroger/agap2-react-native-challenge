export const convertRuntimeToHours = (runtime: number) => {
  if (runtime >= 60) {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime - hours * 60;

    if (minutes !== 0) {
      return `${hours}hr ${minutes}min`;
    }

    return `${hours}hr`;
  }

  return `${runtime}min`;
};

export const getYearFromPremieredDate = (date: string) => {
  const [year] = date.split('-');
  return year;
};

export const separateGenresByComma = (genres: string[]) => genres.join(', ');

export const removeHTMLFromString = (str: string) =>
  str.replace(/(<([^>]+)>)/gi, '');
