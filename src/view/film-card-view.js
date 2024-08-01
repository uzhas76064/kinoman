import AbstractView from '../framework/view/abstract-view';
import {formatStringToYear} from '../utils/common';

const createMovieCardTemplate = (movie) => {
  const {
    title,
    genre,
    totalRating,
    poster,
    release,
    runtime,
    description} = movie.filmInfo;
  const {date} = release;
  const comments = movie.comments;
  const {watchList, alreadyWatched, favorite} = movie.userDetails

  return ( `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${formatStringToYear(date)}</span>
              <span class="film-card__duration">${runtime}m</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src=${poster} alt=${title} class="film-card__poster">
            <p class="film-card__description">${description}...</p>
            <span class="film-card__comments">${comments.length > 1 ? `${comments.length} comments` : `${comments.length} comment`}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchList ? 'film-card__controls-item--active':''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched ? 'film-card__controls-item--active':''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${favorite ? 'film-card__controls-item--active':''}" type="button">Mark as favorite</button>
          </div>
        </article>`);
};

export default class FilmCardView extends AbstractView{
  constructor(movie) {
    super();
    this.movie = movie;
  }

  // Геттер для шаблона
  get template() {
    return createMovieCardTemplate(this.movie);
  }

  setCardClickHandler(callback) {
    this._callback.cardClick = callback;
    this.element.querySelector('a').addEventListener('click', this.#cardClickHandler);
  }

  setAddToWatchListHandler = (callback) => {
    this._callback.addToWatchList = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#addToWatchListHandler)
  }

  setWatchedHandler = (callback) => {
    this._callback.markAsWatched = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedHandler);
  }

  setFavoriteHandler = (callback) => {
    this._callback.markAsFavorite = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteHandler);
  }

  #favoriteHandler = (evt) => {
    evt.preventDefault();
    this._callback.markAsFavorite();
  }

  #watchedHandler = (evt) => {
    evt.preventDefault();
    this._callback.markAsWatched();
  }

  #addToWatchListHandler = (evt) => {
    evt.preventDefault();
    this._callback.addToWatchList();
  }

  #cardClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.cardClick();
  };
}
