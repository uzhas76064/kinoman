import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

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

const generateTitle = () => {
  const titles = [
    'The dance of life',
    'The Great Flamarion',
    'Made For Each other',
    'Popeye Meets Sindbad',
    'Sagebrush Trail'];

  return titles[generateRandomIndex(titles)];
};

const generatePoster = () => {
  const posters = [
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg'
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

const generateGenres = ()=> {
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

  return generateAmountStrings(genres);
};

const generateDates = (startDate, endDate) => {
  const start = dayjs(startDate, 'DD/MMMM/YYYY').valueOf();
  const end = dayjs(endDate, 'DD/MMMM/YYYY').valueOf();
  const randomDate = dayjs(getRandomInteger(start, end));

  return randomDate.format('DD MMMM YYYY');
};

const generateWriters = () => {
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
  return generateAmountStrings(famousWriters);
};

const generateDirector = () => {
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

  return directors[generateRandomIndex(directors)];
};

const generateActors = () => {
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

  return generateAmountStrings(famousActors);
};

const generateAgeRating = () => {
  const ages = ['0+', '6+', '12+', '16+', '18+'];

  return ages[generateRandomIndex(ages)];
};

const generateAlternativeTitle = () => {
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

  return alternativeTitles[generateRandomIndex(alternativeTitles)];
};

export {getRandomInteger, generateRandomFloat, generateRandomIndex, generateAmountStrings,
  generateDates, generateAlternativeTitle, generateDescription, generateDirector,
  generateReleaseCountry, generatePoster, generateGenres, generateWriters, generateAgeRating,
  generateTitle, generateActors};
