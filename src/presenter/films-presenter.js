import {render} from '../framework/render';
import ShowMoreView from '../view/show-more-view';
import FilmsView from '../view/films-view';
import {remove} from '../framework/render';
import NoMoviesView from '../view/no-movies-view';
import FilmListContainerView from '../view/films-list-container-view';
import FilmListView from '../view/film-list-view';
import FilmCardPresenter from "./film-card-presenter";
import {updateItem} from "../utils/common";
import FilmDetailsPresenter from "./film-details-presenter";
import {FilterType, UpdateType, UserAction} from "../const";

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new ShowMoreView();
  #noMoviesComponent = new NoMoviesView();
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
    this.#renderFilmBoard();
  };

  get films() {
    return this.#filmsModel.get();
  }

  #viewActionHandler = (actionType, updateType, updateFilm, updateComment) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.update(updateType, updateFilm);
        break;
      case UserAction.ADD_COMMENT:
        this.#commentsModel.add(updateType, updateComment);
        this.#filmDetailsPresenter.clearLocalCommentViewData();
        this.#filmsModel.update(updateType, updateFilm);
        break;
      case UserAction.DELETE_COMMENT:
        this.#commentsModel.delete(updateType, updateComment);
        this.#filmsModel.update(updateType, updateFilm);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#filmCardPresenter.get(data.id)) {
          this.#filmCardPresenter.get(data.id).init(data);
        }
        if (this.#filmDetailsPresenter && this.#selectedFilm.id === data.id) {
          this.#selectedFilm = data;
          this.#renderFilmDetails();
        }
        break;
      case UpdateType.MINOR:
        this.#clearFilmBoard();
        this.#renderFilmBoard();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmBoard({resetRenderedFilmCount: true});
        this.#renderFilmBoard();
        break;
    }
  };

  #clearFilmBoard = ({resetRenderedFilmCount = false} = {}) => {
    this.#filmCardPresenter.forEach((presenter) => presenter.destroy());
    this.#filmCardPresenter.clear();

    remove(this.#noMoviesComponent);
    remove(this.#filmButtonMoreComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = this.#FILM_COUNT_PER_STEP;
    }
  };

  #renderFilmsList = (films) => {
    this.#renderFilms(
      films,
      this.#filmListContainerComponent
    );

    if (this.#films.length > this.#FILM_COUNT_PER_STEP) {
      this.#renderFilmButtonMore(this.#filmsComponent.element);
    }
  }

  #renderFilms = (films, container) => {
      films.forEach((film) =>
        this.#renderFilm(film, container)
      );
  }

  #renderFilmButtonMore() {
    render(this.#filmButtonMoreComponent, this.#filmListComponent.element);
    this.#filmButtonMoreComponent.setClickHandler(() => this.#filmButtonMoreClickHandler());
  }

  #filmChangeHandler = (updateFilm) => {
    this.#films = updateItem(this.#films, updateFilm);
    this.#filmCardPresenter.get(updateFilm.id).init(updateFilm);

    if (this.#filmDetailsPresenter && this.#selectedFilm === updateFilm.id) {
      this.#selectedFilm = updateFilm;
      this.#renderFilmDetails();
    }
  }

  #renderFilm(film, container) {
    const filmCardPresenter = new FilmCardPresenter(
      container,
      this.#viewActionHandler,
      this.#addFilmDetailsComponent,
      this.#onEscKeyDown
    );

    filmCardPresenter.init(film);
    this.#filmCardPresenter.set(film.id, filmCardPresenter);
  }

  #renderFilmDetails() {
    const comments = [...this.#commentsModel.get(this.#selectedFilm)];

    if (!this.#filmDetailsPresenter) {
      this.#filmDetailsPresenter = new FilmDetailsPresenter(
        this.#container.parentNode,
        this.#viewActionHandler,
        this.#removeFilmDetailsComponent,
        this.#onEscKeyDown
      );
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
    const films = this.films.slice(0, Math.min(this.films.length, this.#FILM_COUNT_PER_STEP))

    if (films.length === 0) {
      render(this.#noMoviesComponent, this.#container);
      return;
    }

    this.#renderFilmsListContainer(this.#container);
    this.#renderFilmsList(films);
  }

  #renderFilmsListContainer = (container) => {
    render(this.#filmsComponent, container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  }
}

