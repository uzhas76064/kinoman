import dayjs from 'dayjs';
import {
  ages,
  alternativeTitles,
  countries,
  directors,
  famousActors,
  famousWriters, Filters,
  genres,
  posters,
  titles, YearsDuration
} from './const';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomValue = (items) =>
  items[getRandomInteger(0, items.length - 1)];

const generateRandomFloat = () => {
  const randomFloat = (Math.random() * 10).toFixed(1);
  return parseFloat(randomFloat);
};

const generateRandomIndex = (dataList) =>  getRandomInteger(0, dataList.length - 1);

const generateAmountStrings = (list) => {
  const numberOfElements = getRandomInteger(1, 4);

  // Используем Set для хранения уникальных жанров
  const selectedElements = new Set(
    Array.from({ length: numberOfElements }, () => list[generateRandomIndex(list)])
  );

  // Используем for...of для добавления жанров, если их меньше, чем нужно
  for (const listElement of list) {
    if (selectedElements.size < numberOfElements) {
      selectedElements.add(listElement);
    } else {
      break;
    }
  }

  return Array.from(selectedElements);
};

const generateTitle = () => titles[generateRandomIndex(titles)];

const generatePoster = () => posters[generateRandomIndex(posters)];

const generateReleaseCountry = () => countries[generateRandomIndex(countries)];


const generateGenres = ()=> generateAmountStrings(genres);

const generateDates = (startDate, endDate) => {
  const start = dayjs(startDate, 'DD/MMMM/YYYY').valueOf();
  const end = dayjs(endDate, 'DD/MMMM/YYYY').valueOf();
  const randomDate = dayjs(getRandomInteger(start, end));

  return randomDate.format('DD MMMM YYYY');
};

const generateWriters = () => generateAmountStrings(famousWriters);

const generateDirector = () => directors[generateRandomIndex(directors)];

const generateActors = () => generateAmountStrings(famousActors);

const generateAgeRating = () => ages[generateRandomIndex(ages)];

const generateAlternativeTitle = () => alternativeTitles[generateRandomIndex(alternativeTitles)];

const generateFilters = () => {
  const filters = [];

  for (const filter in Filters) {
    filters.push(Filters[filter].description);
  }

  return filters;
};

const getDate = () => {
  const date = new Date();

  date.setFullYear(
    date.getFullYear() - getRandomInteger(YearsDuration.MIN, YearsDuration.MAX)
  );

  return date.toISOString();
};

const formatStringToDateWithTime = (date) =>
  new Date(date).toLocaleString('en-GB');

const formatStringToDate = (date) =>
  new Date(date).toLocaleString('en-GB', {day: '2-digit', month: 'long', year: 'numeric'});

const formatStringToYear = (date) =>
  new Date(date).getFullYear();

const formatMinutesToTime = (minutes) => {
  const MINUTES_PER_HOUR = 60;

  return (minutes < MINUTES_PER_HOUR)
    ? `${minutes}m`
    : `${Math.floor(minutes / MINUTES_PER_HOUR)}h ${minutes % MINUTES_PER_HOUR}m`;
};

export {
  formatStringToDateWithTime,
  formatStringToDate,
  formatStringToYear,
  formatMinutesToTime
};

export {getRandomInteger, generateRandomFloat, generateRandomIndex, generateAmountStrings,
  generateDates, generateAlternativeTitle, generateDirector,
  generateReleaseCountry, generatePoster, generateGenres, generateWriters, generateAgeRating,
  generateTitle, generateActors, generateFilters, getRandomValue, getDate};
