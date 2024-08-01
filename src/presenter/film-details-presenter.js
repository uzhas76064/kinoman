import {remove, render} from "../framework/render";
import FilmDetailsView from "../view/movie-popup-view";

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

    render(this.#filmDetailsComponent, this.#container);
  }

  destroy = () => {
    remove(this.#filmDetailsComponent);
  }
}
