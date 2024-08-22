import FilmCardView from "../view/film-card-view";
import {render, replace, remove} from '../framework/render.js';
import {UpdateType, UserAction} from "../const";

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
    this.#filmCardComponent.setWatchlistBtnClickHandler(this.#onAddToWatchList);
    this.#filmCardComponent.setWatchedBtnClickHandler(this.#onSetWatched);
    this.#filmCardComponent.setFavoriteBtnClickHandler(this.#onSetFavorite);

    if (prevFilmComponent === null) {
      render(this.#filmCardComponent, this.#container.element);
      return;
    }

    replace(this.#filmCardComponent, prevFilmComponent);

    remove(prevFilmComponent);
  }

  setFilmEditing = () => {
    this.#filmCardComponent.updateElement({isFilmEditing: true});
  };

  setAborting = () => {
    this.#filmCardComponent.updateElement({isFilmEditing: false});
  };

  destroy = () => {
    remove(this.#filmCardComponent);
  }

  #onAddToWatchList = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist
        },
      });
  }

  #onSetWatched = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          alreadyWatched: !this.#film.userDetails.alreadyWatched
        }
      });
  }

  #onSetFavorite = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          favorite: !this.#film.userDetails.favorite
        }
      });
  }
}
