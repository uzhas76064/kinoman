import {createFilmDetailsCommentsTemplate} from './films-details-comments-template';
import {createFilmDetailsFormTemplate} from './films-details-form-template';
import {createFilmDetailsInfoTemplate} from './films-details-info-template';
import {createFilmDetailsControlsTemplate} from './films-details-controls-template';
import AbstractStatefulView from "../framework/view/abstract-stateful-view";

const createFilmDetailsTemplate = ({filmInfo, userDetails, comment, checkedEmotion}, comments) =>
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

            ${createFilmDetailsFormTemplate(checkedEmotion)}

          </section>
        </div>
      </div>
    </section>
 `;

export default class FilmDetailsView extends AbstractStatefulView {

  constructor(film, comments, viewData, updateViewData) {
    super();
    // this.#setInnerHandlers()
    this._state = this.#convertFilmToState(film, comments);
    this.updateViewData = updateViewData;
    this._restoreHandlers();
    this.#setInnerHandlers();
  }

  _restoreHandlers = () => {
    this.setAddToWatchListHandler(this._callback.addToWatchList);
    this.setWatchedHandler(this._callback.markAsWatched);
    this.setFavoriteHandler(this._callback.markAsFavorite);
    this.setCloseBtnClickHandler(this._callback.closeBtnClick);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state, this._state.comments);
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-label')
      .forEach((element) => {
        element.addEventListener('click', this.#emotionClickHandler)
      });
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler)
  }

  // TODO исправить скролл при изменении эмоции в новом комментарии
  #convertFilmToState = (film, comments, checkedEmotion=null, comment=null, scrollPosition=0) => ({
    ...film,
    comments,
    checkedEmotion,
    comment,
    scrollPosition
  });

  setCommentData = () => {
    this.#updateViewData();
  };

  setScrollPosition = () => {
    this.element.scrollTop = this._state.scrollPosition;
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this._callback.commentDeleteClick(evt.target.dataset.commentId);
  }

  setCommentDeleteClickHandler = (callback) => {
    const commentDeleteElements = this.element.querySelectorAll('.film-details__comment-delete');

    if (commentDeleteElements) {
      this._callback.commentDeleteClick = callback;
      commentDeleteElements.forEach(
        (element) =>
          element.addEventListener('click', this.#commentDeleteClickHandler)
      );
    }
  }

  #emotionClickHandler = (evt) => {
    evt.preventDefault();
    console.log('click');
    this.updateElement({
      checkedEmotion: evt.currentTarget.dataset.emotionType,
      scrollPosition: this.element.scrollTop
    })
  }

  #commentInputHandler = (evt) => {
    evt.preventDefault();
    console.log('input')
    this._setState({
      comment: evt.target.value
    })
  }

  setAddToWatchListHandler = (callback) => {
    this._callback.addToWatchList = callback;
    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#addToWatchListHandler)
  }

  #updateViewData = () => {
    this.updateViewData({
      comment: this._state.comment,
      emotion: this._state.checkedEmotion,
      scrollPosition: this.element.scrollTop
    })
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
    this.#updateViewData();
    this.element.querySelector('.film-details__control-button--favorite')
      .classList.toggle('film-details__control-button--active');
    this._callback.markAsFavorite();
  }

  #watchedHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
    this.element.querySelector('.film-details__control-button--watched')
      .classList.toggle('film-details__control-button--active');
    this._callback.markAsWatched();
  }

  #addToWatchListHandler = (evt) => {
    evt.preventDefault();
    this.#updateViewData();
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

