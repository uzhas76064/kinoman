// Symbol используется для создания подобия enum
const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const FILTER_TYPE_ALL_NAME = 'All movies';

const Emojis = [
  'Smile',
  'Sleeping',
  'Puke',
  'Angry',
];

const famousActors = [
  'Marlon Brando',
  'James Dean',
  'Humphrey Bogart',
  'Cary Grant',
  'James Stewart',
  'Clark Gable',
  'John Wayne',
  'Henry Fonda',
  'Paul Newman',
  'Gregory Peck',
  'Charlie Chaplin',
  'Laurence Olivier',
  'Spencer Tracy',
  'Gary Cooper',
  'Orson Welles',
  'Robert De Niro',
  'Al Pacino',
  'Jack Nicholson',
  'Marlon Brando',
  'Sidney Poitier'
];

const ages = ['0+', '6+', '12+', '16+', '18+'];

const famousWriters = [
  'Woody Allen',
  'Quentin Tarantino',
  'Billy Wilder',
  'Ingmar Bergman',
  'Charlie Kaufman',
  'Francis Ford Coppola',
  'Stanley Kubrick',
  'Ethan Coen',
  'Joel Coen',
  'Christopher Nolan',
  'Robert Towne',
  'Aaron Sorkin',
  'Paddy Chayefsky',
  'Eric Roth',
  'Dalton Trumbo',
  'Akira Kurosawa',
  'David Mamet',
  'Paul Schrader',
  'John Hughes',
  'Martin Scorsese'
];

const posters = [
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg'
];

const DaysDuration = {
  MIN: 0,
  MAX: 7
};

const YearsDuration = {
  MIN: 5,
  MAX: 10
};

const names = [
  'Alice',
  'Ivan',
  'Sergey',
  'Dakota',
  'Nevada',
  'Fedor'
];

const surnames = [
  'Makoveev',
  'Ivanov',
  'Romanov',
  'Lee',
  'James',
  'Walker'
];

const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR'
};

const comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.';

export {UserAction, UpdateType, FILTER_TYPE_ALL_NAME, FilterType, YearsDuration, comment, DaysDuration, surnames, names, Emojis, ages, posters , famousActors, famousWriters};
