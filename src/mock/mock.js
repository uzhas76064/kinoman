import {
  generateActors, generateAgeRating, generateAlternativeTitle,
  generateDates, generateDescription, generateDirector, generateGenres, generatePoster,
  generateRandomFloat,
  generateReleaseCountry,
  generateTitle, generateWriters,
  getRandomInteger
} from '../utils';
import dayjs from 'dayjs';

let movieIdCounter = 1;
let commentIdCounter = 1;

const generateMovie = () => ({
  id: movieIdCounter++, // Уникальный ID для каждого фильма
  comments: Array.from({length: 4}, (_value, commentIndex) => String(commentIndex + 1 )),
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateAlternativeTitle(),
    totalRating: generateRandomFloat(),
    poster: generatePoster(),
    ageRating: generateAgeRating(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      date: generateDates('01/01/1920', '01/01/1989'),
      releaseCountry: generateReleaseCountry()
    },
    runtime: getRandomInteger(77, 187),
    genre: generateGenres(),
    description: generateDescription().slice(0, 50)
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: generateDates('01/01/2020', dayjs().valueOf()) || null,
    favorite: Boolean(getRandomInteger(0, 1))
  }
});

const generateLocalComment = () => ({
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  emotion: 'smile'
});

const generateComment = () => ({
  id: commentIdCounter++, // Уникальный ID для каждого комментария
  author: 'Ilya O\'Reilly',
  comment: 'a film that changed my life, a true masterpiece, post-credit scene was just amazing omg.',
  date: dayjs().format('DD/MM/YYYY hh:mm'),
  emotion: 'smile'
});

export {generateLocalComment, generateComment, generateMovie};
