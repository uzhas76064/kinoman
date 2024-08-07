import {generateFilms} from '../mock/films';
import Observable from "../framework/observable";

export default class FilmsModel extends Observable{
  #films = generateFilms();

  get movies() {
    return this.#films;
  }
}
