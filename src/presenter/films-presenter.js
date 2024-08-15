import {remove, render} from '../framework/render';
import ShowMoreView from '../view/show-more-view';
import FilmsView from '../view/films-view';
import NoMoviesView from '../view/no-movies-view';
import FilmListContainerView from '../view/films-list-container-view';
import FilmListView from '../view/film-list-view';
import FilmCardPresenter from "./film-card-presenter";
import FilmDetailsPresenter from "./film-details-presenter";
import {FilterType, UpdateType, UserAction} from "../const";
import {filter} from "../utils/filter";
import LoadingView from "../view/loading-view";

export default class FilmsPresenter {
  #filmsComponent = new FilmsView();
  #filmListComponent = new FilmListView();
  #filmListContainerComponent = new FilmListContainerView();
  #filmButtonMoreComponent = new ShowMoreView();
  #noMoviesComponent = new NoMoviesView();
  #loadingComponent = new LoadingView();
  #filmCardPresenter = new Map();
  #filmDetailsPresenter = null;
  #selectedFilm = null;
  #filterModel = null;

  #container = null;
  #filmsModel = null;
  #commentsModel = null;

  #films = [];
  #FILM_COUNT_PER_STEP = 5;
  #isLoading = true;

  #renderedFilmCount = this.#FILM_COUNT_PER_STEP;

  constructor(container, filmsModel, commentsModel, filterModel) {
    this.#container = container;
    this.#filmsModel = filmsModel;
    this.#commentsModel = commentsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#modelEventHandler);
    this.#filterModel.addObserver(this.#modelEventHandler);
  }

  init = () => {
    this.#renderFilmBoard();
  };

  get films() {
    const filterType = this.#filterModel.get();
    const films = this.#filmsModel.get();

    console.log(filterType)
    // Проверка наличия функции в объекте filter
    if (!filter[filterType]) {
      throw new Error(`Фильтр "${filterType}" не существует в объекте filter`);
    }

    return filter[filterType](films);
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
        if (this.#filterModel.get() !== FilterType.ALL) {
          this.#modelEventHandler(UpdateType.MINOR);
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderFilmBoard();
        break;
    }
  };

  #renderLoadingView = (container) => {
    render(this.#loadingComponent, container)
  }

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
    console.log(1)
    this.#renderFilms(
      films,
      this.#filmListContainerComponent
    );

    if (this.films.length > this.#FILM_COUNT_PER_STEP) {
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

    document.addEventListener('keydown', this.#onCtrlEnterDown);

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
    document.removeEventListener('keydown', this.#onCtrlEnterDown);

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
    this.films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + this.#FILM_COUNT_PER_STEP)
      .forEach((film) => {
        this.#renderFilm(film, this.#filmListContainerComponent);
      });

    this.#renderedFilmCount += this.#FILM_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.films.length) {
      this.#filmButtonMoreComponent.element.remove();
      this.#filmButtonMoreComponent.removeElement();
    }
  }

  #renderFilmBoard() {
    const films = this.films.slice(0, Math.min(this.films.length, this.#FILM_COUNT_PER_STEP))

    if (this.#isLoading) {
      this.#renderLoadingView(this.#container);
      return
    }

    if (films.length === 0) {
      render(this.#noMoviesComponent, this.#container);
      return;
    }

    this.#renderFilmsListContainer(this.#container);

    this.#renderFilmsList(films);
  }

  #onCtrlEnterDown = (evt) => {
    if (evt.key === 'Enter' && (evt.metaKey || evt.ctrlKey)) {
      evt.preventDefault();
      this.#filmDetailsPresenter.createComment();
    }
  }

  #renderFilmsListContainer = (container) => {
    render(this.#filmsComponent, container);
    render(this.#filmListComponent, this.#filmsComponent.element);
    render(this.#filmListContainerComponent, this.#filmListComponent.element);
  }
}

