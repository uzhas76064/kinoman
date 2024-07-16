import AbstractView from '../framework/view/abstract-view';

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

  return ( `<article class="film-card">
          <a class="film-card__link">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${totalRating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${date}</span>
              <span class="film-card__duration">${runtime}m</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src=${poster} alt=${title} class="film-card__poster">
            <p class="film-card__description">${description}...</p>
            <span class="film-card__comments">${comments.length > 1 ? `${comments.length} comments` : `${comments.length} comment`}</span>
          </a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist film-card__controls-item--active" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`);
};

export default class MovieCardView extends AbstractView{
  constructor(movie) {
    super();
    this.movie = movie;
  }

  // Геттер для шаблона
  get template() {
    return createMovieCardTemplate(this.movie);
  }

  setOpenPopupHandler = (callback) => {
    this._callback.openPopup = callback;
    this.element.addEventListener('click', this.#openPopupHandler);
  };

  #openPopupHandler = (evt) => {
    evt.preventDefault();
    this._callback.openPopup(evt);
  };
}
