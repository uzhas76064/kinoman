import {generateFilms} from '../mock/films';
import Observable from "../framework/observable";

export default class FilmsModel extends Observable{
  #filmApiService = null;
  #films = generateFilms();

  constructor({filmApiService}) {
    super();
    this.#filmApiService = filmApiService;

    this.#filmApiService.films.then((films) => {
      console.log(films)
    })
  }

  #adaptToClient = (film) => {
    const adaptedFilm = {
      ...film,
    }
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
