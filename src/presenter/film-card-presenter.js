import FilmCardView from "../view/film-card-view";
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
    this.#filmCardComponent = new FilmCardView(this.#film);

    this.#filmCardComponent.setCardClickHandler(() => {
      this.#clickCardHandler(this.#film);
      document.addEventListener('keydown', this.#escKeyHandler);
    })
    this.#filmCardComponent.setAddToWatchListHandler(() => {
      console.log('added')
    })
    this.#filmCardComponent.setWatchedHandler(() => {
      console.log('watched')
    })
    this.#filmCardComponent.setFavoriteHandler(() => {
      console.log('favorite')
    })

    if (prevFilmComponent === null) {
      render(this.#filmCardComponent, this.#container.element);
      return;
    }

    replace(this.#filmCardComponent, prevFilmComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
  }
}
