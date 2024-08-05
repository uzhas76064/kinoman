import {createFilmDetailsCommentsTemplate} from './films-details-comments-template';
import {createFilmDetailsFormTemplate} from './films-details-form-template';
import {createFilmDetailsInfoTemplate} from './films-details-info-template';
import {createFilmDetailsControlsTemplate} from './films-details-controls-template';
import AbstractStatefulView from "../framework/view/abstract-stateful-view";

const createFilmDetailsTemplate = ({filmInfo, userDetails}, comments) =>
  `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>

          ${createFilmDetailsInfoTemplate(filmInfo)}

          ${createFilmDetailsControlsTemplate(userDetails)}

        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">
              Comments <span class="film-details__comments-count">${comments.length}</span>
            </h3>

            ${createFilmDetailsCommentsTemplate(comments)}

            ${createFilmDetailsFormTemplate()}

          </section>
        </div>
      </div>
    </section>
 `;

export default class FilmDetailsView extends AbstractStatefulView {
  #film = null;
  #comments = null;

  constructor(film, comments) {
    super();
    this.#film = film;
    this.#comments = comments;
  }

  get template() {
    return createFilmDetailsTemplate(this.#film, this.#comments);
  }

  setAddToWatchListHandler = (callback) => {
    this._callback.addToWatchList = callback;
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#addToWatchListHandler)
  }

  setWatchedHandler = (callback) => {
    this._callback.markAsWatched = callback;
    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedHandler);
  }

  setFavoriteHandler = (callback) => {
    this._callback.markAsFavorite = callback;
    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteHandler);
  }

  #favoriteHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelector('.film-details__control-button--favorite')
      .classList.toggle('film-details__control-button--active');
    this._callback.markAsFavorite();
  }

  #watchedHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelector('.film-details__control-button--watched')
      .classList.toggle('film-details__control-button--active');
    this._callback.markAsWatched();
  }

  #addToWatchListHandler = (evt) => {
    evt.preventDefault();
    this.element.querySelector('.film-details__control-button--watchlist')
      .classList.toggle('film-details__control-button--active');
    this._callback.addToWatchList();
  }


  setCloseBtnClickHandler(callback) {
    this._callback.closeBtnClick = callback;
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeBtnClickHandler);
  }

  #closeBtnClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeBtnClick();
  };
}

