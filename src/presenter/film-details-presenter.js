import {remove, render} from "../framework/render";
import FilmDetailsView from "../view/film-popup-view";

export default class FilmDetailsPresenter {
  #container = null;
  #changeData = null;
  #closeBtnClickHandler = null;
  #escKeyHandler = null;
  #filmDetailsComponent = null;
  #films = null;
  #comments = null;

  constructor (container, changeData, closeBtnClickHandler, escKeyHandler) {
    this.#container = container;
    this.#changeData = changeData;
    this.#closeBtnClickHandler = closeBtnClickHandler;
    this.#escKeyHandler = escKeyHandler;
  }

  init = (films, comments) => {
    this.#films = films;
    this.#comments = comments;

    this.#filmDetailsComponent = new FilmDetailsView(this.#films, this.#comments);

    this.#filmDetailsComponent.setCloseBtnClickHandler(() => {
      this.#closeBtnClickHandler();
      document.removeEventListener('keydown', this.#escKeyHandler);
    });
    this.#filmDetailsComponent.setAddToWatchListHandler(() => {console.log('watchlist')})
    this.#filmDetailsComponent.setWatchedHandler(() => {console.log('watched')})
    this.#filmDetailsComponent.setFavoriteHandler(() => {console.log('favorite')})

    render(this.#filmDetailsComponent, this.#container);
  }

  destroy = () => {
    remove(this.#filmDetailsComponent);
  }
}
