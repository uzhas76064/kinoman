import {render, RenderPosition} from '../render';
import MovieCardView from '../view/movie-card-view';
import ShowMoreView from '../view/show-more-view';
import MoviesView from '../view/movies-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import MoviePopupView from '../view/movie-popup-view';

export default class MainPresenter {
  films = new MoviesView();
  moviesContainer = document.querySelector('.films');
  bodyElement = document.querySelector('body');

  #renderMovieCard(mv) {
    render(new MovieCardView(mv), document.querySelector('.films'));
  }

  #onClosePopup(popup) {
    this.bodyElement.classList.remove('hide-overflow');
    popup.removeElement();
  }

  #onEscKeyDown(popup, evt) {
    evt.preventDefault();
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#onClosePopup(popup);
    }
  }

  #renderMoviePopup(mvInfo) {
    const popup =  new MoviePopupView(mvInfo);
    let closeButton;

    this.moviesContainer.addEventListener('click', (evt) => {
      if (evt.target.matches('.film-card')) {
        this.bodyElement.appendChild(popup.element);
        this.bodyElement.classList.add('hide-overflow');
        closeButton = document.querySelector('.film-details__close-btn');
        closeButton.addEventListener('click', () => {this.#onClosePopup(popup);});

      }
      document.addEventListener('keydown', (e) => {this.#onEscKeyDown(popup, e);});
    });
  }

  // Метод инициализации, принимающий контейнер и модели фильмов и попапа
  init = (container, moviesModel, moviePopupModel) => {
    // Присваиваем переданный контейнер свойству moviesContainer
    this.moviesContainer = container;
    // Сохраняем переданные модели в свойствах класса
    this.moviesModel = moviesModel;
    this.moviePopupModel = moviePopupModel;
    // Получаем список фильмов из модели и сохраняем его в свойство класса
    this.movies = [...this.moviesModel.movies];
    // Получаем данные для попапа из модели и сохраняем их в свойство класса
    this.popupMovie = this.moviePopupModel.moviePopup;

    // Рендерим представление фильмов в контейнер
    render(new MoviesView(), this.moviesContainer);
    // Рендерим представление фильтра перед контейнером фильмов
    render(new FilterView(), this.moviesContainer, RenderPosition.BEFOREBEGIN);
    // Рендерим представление сортировки внутри контейнера фильмов в начало
    render(new SortView(), this.moviesContainer, RenderPosition.AFTERBEGIN);

    // Рендерим первые 6 карточек фильмов в контейнер фильмов
    for (let i = 0; i < 6; i++) {
      this.#renderMovieCard(this.movies[i]);
    }

    this.#renderMoviePopup(this.popupMovie);

    render(new ShowMoreView(), document.querySelector('.films'));
  };
}

