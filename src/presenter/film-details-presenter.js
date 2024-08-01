import {remove, render, replace} from "../framework/render";
import FilmDetailsView from "../view/film-popup-view";

export default class FilmDetailsPresenter {
  #container = null;
  #changeData = null;
  #closeBtnClickHandler = null;
  #escKeyHandler = null;
  #filmDetailsComponent = null;
  #film = null;
  #comments = null;

  constructor (container, changeData, closeBtnClickHandler, escKeyHandler) {
    this.#container = container;
    this.#changeData = changeData;
    this.#closeBtnClickHandler = closeBtnClickHandler;
    this.#escKeyHandler = escKeyHandler;
  }

  init = (films, comments) => {
    this.#film = films;
    this.#comments = comments;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(this.#film, this.#comments);

    this.#filmDetailsComponent.setCloseBtnClickHandler(() => {
      this.#closeBtnClickHandler();
      document.removeEventListener('keydown', this.#escKeyHandler);
    });
    this.#filmDetailsComponent.setAddToWatchListHandler(this.#onAddToWatchList)
    this.#filmDetailsComponent.setWatchedHandler(this.#onSetWatched)
    this.#filmDetailsComponent.setFavoriteHandler(this.#onSetFavorite)

    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container);
      return;
    }

    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);

    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmDetailsComponent);
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
