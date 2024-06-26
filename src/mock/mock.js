import {getRandomInteger} from '../utils';
import dayjs from 'dayjs';

const generateRandomIndex = (dataList) =>  getRandomInteger(0, dataList.length - 1);


const generateTitle = () => {
  const titles = [
    'The dance of life',
    'The Great Flamarion',
    'Made for each other'];

  return titles[generateRandomIndex(titles)];
};

const generatePoster = () => {
  const posters = [
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/made-for-each-other.jpg'
  ];

  return posters[generateRandomIndex(posters)];
};

const generateReleaseCountry = () => {
  const countries = [
    'USA',
    'Germany',
    'Nederland'
  ];

  return countries[generateRandomIndex(countries)];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Aliquam erat volutpat'
  ];

  return descriptions[generateRandomIndex(descriptions)];
};

let movieIdCounter = 1;
let commentIdCounter = 1;

const generateMovie = () => ({
  id: movieIdCounter++, // Уникальный ID для каждого фильма
  comments: Array.from({length: 4}, (_value, commentIndex) => String(commentIndex + 1 )),
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: '',
    totalRating: 0,
    poster: generatePoster(),
    ageRating: 0,
    director: '',
    writers: [],
    actors: [],
    release: {
      date: null,
      releaseCountry: generateReleaseCountry()
    },
    runtime: 0,
    genre: [],
    description: generateDescription()
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: null,
    favorite: false
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
  date: dayjs().format('DD/MM/YYYY'),
  emotion: 'smile'
});

export {generateLocalComment, generateComment, generateMovie};
