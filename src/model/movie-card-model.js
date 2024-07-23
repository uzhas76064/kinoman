import {generateFilms} from '../mock/films';

export default class MovieCardModel {
  #movies = generateFilms();

  get movies() {
    return this.#movies;
  }
}
