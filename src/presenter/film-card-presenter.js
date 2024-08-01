import MovieCardView from "../view/movie-card-view";
import {render, replace, remove} from '../framework/render.js';

export default class FilmCardPresenter {
  #container = null;
  #changeData = null;
  #clickCardHandler = null;
  #escKeyHandler = null;
  #filmCardComponent = null;
  #film = null;

  constructor(container, changeData, clickCardHandler, escKeyHandler) {
    this.#container = container;
    this.#changeData = changeData;
    this.#clickCardHandler = clickCardHandler;
    this.#escKeyHandler = escKeyHandler;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmCardComponent;
    this.#filmCardComponent = new MovieCardView(this.#film);

    this.#filmCardComponent.setCardClickHandler(() => {
      this.#clickCardHandler(this.#film);
      document.addEventListener('keydown', this.#escKeyHandler);
    })

    render(this.#filmCardComponent, this.#container.element);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
  }
}
