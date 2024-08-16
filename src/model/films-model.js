import Observable from "../framework/observable";
import {UpdateType} from "../const";

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

   this._notify(UpdateType.INIT)
  }

  #adaptToClient(film) {
    const adaptedFilm = {
      ...film,
      filmInfo: {
        ...film['film_info'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        ageRating: film['film_info']['age_rating']
      },
      userDetails: {
        ...film['user_details'],
        alreadyWatched: film['user_details']['already_watched'],
        watchingDate: film['user_details']['watching_date']
      }
    };

    delete adaptedFilm['film_info'];
    delete adaptedFilm['user_details'];
    delete adaptedFilm.filmInfo['alternative_title'];
    delete adaptedFilm.filmInfo['total_rating'];
    delete adaptedFilm.filmInfo['age_rating'];
    delete adaptedFilm.userDetails['already_watched'];
    delete adaptedFilm.userDetails['watching_date'];

    return adaptedFilm;
  }

  get = () => {
    return this.#films;
  }

  update = async (updateType, update) => {
    const index = this.#films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update not existing film');
    }

    try {
      const response = await this.#filmApiService.updateFilms(update);
      const updatedFilm = this.#adaptToClient(response);
      this.#films = [
        ...this.#films.slice(0, index),
        updatedFilm,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, update);
    } catch (err) {
      throw new Error(err)
    }
  };
}
