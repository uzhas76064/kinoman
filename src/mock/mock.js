export const generateMovie = () => ({
  id: 0,
  comments: [],
  filmInfo: {
    title: '',
    alternativeTitle: '',
    totalRating: 0,
    poster: '',
    ageRating: 0,
    director: '',
    writers: [],
    actors: [],
    release: {
      date: null,
      releaseCountry: ''
    },
    runtime: 0,
    genre: [],
    description: ''
  },
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: null,
    favorite: false
  }
});
