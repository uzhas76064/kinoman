import Observable from "../framework/observable";

export default class FilmsModel extends Observable{
  #filmApiService = null;
  #films = [];

  constructor({filmApiService}) {
    super();
    this.#filmApiService = filmApiService;
  }

  init = async () => {
   try {
     const films = await this.#filmApiService.films;
     this.#films = films.map(this.#adaptToClient)
     console.log(this.#films)
   } catch (err) {
     this.#films = []
     throw new Error(err)
   }
  }

  #deleteUnusedProps = (obj) => {
    delete obj['film_info'];
    delete obj.filmInfo['alternative_title'];
    delete obj.filmInfo['total_rating'];
    delete obj.filmInfo['age_rating'];
    delete obj['user_details'];
    delete obj.userDetails['watchlist'];
    delete obj.userDetails['already_watched'];
    delete obj.userDetails['watching_date'];
  }

  #adaptToClient = (film) => {
    const filmInfo = film['film_info'];

    const adaptedFilm = {
      ...film,
      filmInfo: {
        ...filmInfo,
        alternativeTitle: filmInfo['alternative_title'],
        totalRating: filmInfo['total_rating'],
        ageRating: filmInfo['age_rating'],
        release: {
          ...filmInfo['release'],
          releaseCountry: filmInfo['release']['release_country']
        }
      },
      userDetails: {
        ...film['user_details'],
        watchList: film['user_details']['watchlist'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date']
      }
    }

    this.#deleteUnusedProps(adaptedFilm);

    return adaptedFilm;
  }

  get = () => {
    return this.#films;
  }

  update = (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update not existing film');
    }

    this.#films = [
      ...this.#films.slice(0, index),
      update,
      ...this.#films.slice(index + 1),
    ];

    this._notify(updateType, update);
  };
}
