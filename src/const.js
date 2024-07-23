// Symbol используется для создания подобия enum
const Filters = {
  All: Symbol('All movies'),
  Watchlist: Symbol('Watchlist'),
  History: Symbol('History'),
  Favorites: Symbol('Favorites')
};

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

const directors = [
  'Alfred Hitchcock',
  'Stanley Kubrick',
  'Orson Welles',
  'Akira Kurosawa',
  'Federico Fellini',
  'Ingmar Bergman',
  'John Ford',
  'Billy Wilder',
  'Jean-Luc Godard',
  'Francis Ford Coppola',
  'Steven Spielberg',
  'Martin Scorsese',
  'François Truffaut',
  'Sergio Leone',
  'David Lean',
  'Luis Buñuel',
  'Howard Hawks',
  'Woody Allen',
  'Roman Polanski',
  'Robert Altman'
];

const alternativeTitles = [
  'The Don',
  'The Adventures of Luke Starkiller',
  'Black Mask',
  'Schindler\'s Ark',
  'Everybody Comes to Rick\'s',
  'The Bates Motel',
  'American',
  'Rita Hayworth and Shawshank Redemption',
  'Tomorrow is Another Day',
  'The Man Who Would Be King',
  'The Magical Land of Oz',
  'McMurphy',
  'The Silence of the Deep',
  'The Horror',
  'Journey Beyond the Stars',
  'The Singing Heart',
  'A Boy\'s Life',
  'The Italian Stallion',
  'The Bronx Bull',
  'Wise Guy'
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

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'Film Noir',
  'History',
  'Horror',
  'Musical',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western'
];

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.';


const countries = [
  'USA',
  'Germany',
  'Nederland'
];

const Runtime = {
  MIN: 60,
  MAX: 180
};

const posters = [
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg'
];

const titles = [
  'The dance of life',
  'The Great Flamarion',
  'Made For Each other',
  'Popeye Meets Sindbad',
  'Sagebrush Trail'];

const GenreCount = {
  MIN: 1,
  MAX: 3
};

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

const comment = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.';


export {Filters, YearsDuration, comment, DaysDuration, surnames, names, Emojis,Runtime,GenreCount, ages, countries, titles, alternativeTitles, description, directors, genres, posters , famousActors, famousWriters};
