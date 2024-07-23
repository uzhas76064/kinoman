import {generateFilms} from '../mock/mock';

export default class MovieCardModel {
  #movies = generateFilms();

  get movies() {
    return this.#movies;
  }
}
