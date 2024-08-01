import {render} from '../framework/render';
import ShowMoreView from '../view/show-more-view';
import FilmsView from '../view/films-view';
import SortView from '../view/sort-view';
import {remove} from '../framework/render';
import NoMoviesView from '../view/no-movies-view';
import FilmListContainerView from '../view/films-list-container-view';
import FilmListView from '../view/film-list-view';
import FilmCardPresenter from "./film-card-presenter";
import {updateItem} from "../utils/common";
import FilmDetailsPresenter from "./film-details-presenter";

export default class FilmsPresenter {
  #sortComponent = new SortView();
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new ShowMoreView();
  #filmDetailsComponent = null;
  #filmCardPresenter = new Map();
  #filmDetailsPresenter = null;
  #selectedFilm = null;

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #FILM_COUNT_PER_STEP = 5;

  #renderedFilmCount = this.#FILM_COUNT_PER_STEP;

  constructor(container, filmsModel, commentsModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.movies];

    this.#renderFilmBoard();
  };

  #filmChangeHandler = (updateFilm) => {
    this.#films = updateItem(this.#films, updateFilm);
    this.#filmCardPresenter.get(updateFilm.id).init(updateFilm);

    if (this.#filmDetailsPresenter && this.#selectedFilm === updateFilm.id) {
      this.#selectedFilm = updateFilm;
      this.#renderFilmDetails();
    }
  }

  #renderFilm(film, container) {
    const filmCardPresenter = new FilmCardPresenter(container,
      this.#filmChangeHandler,
      this.#addFilmDetailsComponent,
      this.#onEscKeyDown);

    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  }

  #renderFilmDetails() {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];

    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        this.#container,
        this.#filmChangeHandler,
        this.#removeFilmDetailsComponent,
        this.#onEscKeyDown);
    }

    this.#filmDetailsPresenter.init(this.#selectedFilm, comments);
  }

  #addFilmDetailsComponent = (film) => {
    if (this.#selectedFilm && this.#selectedFilm.id === film.id) {
      return;
    }

    if (this.#selectedFilm && this.#selectedFilm.id !== film.id) {
      this.#removeFilmDetailsComponent();
    }

    this.#selectedFilm = film;
    this.#renderFilmDetails();

    document.body.classList.add('hide-overflow');
  };

  #removeFilmDetailsComponent = () => {
    remove(this.#filmDetailsComponent);
    this.#filmDetailsPresenter.destroy();
    this.#filmDetailsPresenter = null;
    this.#selectedFilm = null;
    document.body.classList.remove('hide-overflow');
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#removeFilmDetailsComponent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #filmButtonMoreClickHandler() {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + this.#FILM_COUNT_PER_STEP)
      .forEach((film) => {
        this.#renderFilm(film, this.#filmListContainerComponent);
      });

    this.#renderedFilmCount += this.#FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  }

  #renderFilmBoard() {
    if (this.#films.length === 0) {
      render(new NoMoviesView(), this.#container);
      return;
    }

    render(this.#sortComponent, this.#container);
    render(this.#filmsComponent, this.#container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);

    this.#films
      .slice(0, Math.min(this.#films.length, this.#FILM_COUNT_PER_STEP))
      .forEach((film) =>
        this.#renderFilm(film, this.#filmListContainerComponent)
      );

    if (this.#films.length > this.#FILM_COUNT_PER_STEP) {
      render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
      this.#filmButtonMoreComponent.setClickHandler(() => this.#filmButtonMoreClickHandler());
    }
  }
}

