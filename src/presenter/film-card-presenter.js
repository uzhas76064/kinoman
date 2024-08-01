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
    this.#filmCardComponent.setAddToWatchListHandler(this.#onAddToWatchList);
    this.#filmCardComponent.setWatchedHandler(this.#onSetWatched);
    this.#filmCardComponent.setFavoriteHandler(this.#onSetFavorite);

    if (prevFilmComponent === null) {
      render(this.#filmCardComponent, this.#container.element);
      return;
    }

    replace(this.#filmCardComponent, prevFilmComponent);

    remove(prevFilmComponent);
  }

  destroy = () => {
    remove(this.#filmCardComponent);
  }

  #onAddToWatchList = () => {
    console.log('watchlist')
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        watchList: !this.#film.userDetails.watchList,
      }
    })
  }

  #onSetWatched = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,

      }
    })
  }

  #onSetFavorite = () => {
    this.#changeData({
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      }
    })
  }
}
