import {
  generateActors,
  generateAgeRating, generateWriters, getDate, getRandomInteger,
  getRandomValue

} from '../utils/common';
import {countries, DateType, description, directors, GenreCount, genres, posters, Runtime, titles} from '../const';

const generateMovie = () => ({
  title: getRandomValue(titles),
  alternativeTitle: getRandomValue(titles),
  totalRating: generateAgeRating(),
  poster: getRandomValue(posters),
  ageRating:generateAgeRating(),
  director: `${getRandomValue(directors)}}`,
  writers: generateWriters(),
  actors: generateActors(),
  release: {
    date: getDate(),
    releaseCountry: getRandomValue(countries)
  },
  runtime: getRandomInteger(Runtime.MIN, Runtime.MAX),
  genre:  Array.from({length: getRandomInteger(GenreCount.MIN, GenreCount.MAX)}, () => getRandomValue(genres)),
  description
});

const generateFilms = () => {
  const films = Array.from({length: 20}, generateMovie);

  let totalCommentsCount = 0;
  const getWatchingDate = () => getDate(DateType.USER_DETAILS);

  return films.map((film, index) => {
    const hasComments = getRandomInteger(0, 1);

    const filmCommentsCount = (hasComments)
      ? getRandomInteger(1, 5)
      : 0;

    totalCommentsCount += filmCommentsCount;
    const alreadyWatched =  Boolean(getRandomInteger(0, 1));

    return {
      id: String(index + 1),
      comments: (hasComments)
        ? Array.from({length: filmCommentsCount},
          (_value, commentIndex) => String(totalCommentsCount - commentIndex)
        )
        : [],
      filmInfo: film,
      userDetails: {
        watchList: Boolean(getRandomInteger(0, 1)),
        alreadyWatched: alreadyWatched,
        watchingDate: alreadyWatched ? getWatchingDate() : null
      }
    };
  });
};

export {generateFilms, generateMovie};
