import {render, RenderPosition} from '../render';
import MovieCardView from '../view/movie-card-view';
import ShowMoreView from '../view/show-more-view';
import MoviesView from '../view/movies-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import MoviePopupView from '../view/movie-popup-view';

export default class MainPresenter {
  // Создаем экземпляр представления фильмов
  films = new MoviesView();
  // Находим контейнер для фильмов в DOM
  moviesContainer = document.querySelector('.films');
  // Находим элемент body в DOM
  bodyElement = document.querySelector('body');

  // Метод инициализации, принимающий контейнер и модели фильмов и попапа
  init = (container, moviesModel, moviePopupModel) => {
    // Присваиваем переданный контейнер свойству moviesContainer
    this.moviesContainer = container;
    // Сохраняем переданные модели в свойствах класса
    this.moviesModel = moviesModel;
    this.moviePopupModel = moviePopupModel;
    // Получаем список фильмов из модели и сохраняем его в свойство класса
    this.movies = [...this.moviesModel.getMovies()];
    // Получаем данные для попапа из модели и сохраняем их в свойство класса
    this.popupMovie = this.moviePopupModel.getMoviePopup();

    // Рендерим представление фильмов в контейнер
    render(new MoviesView(), this.moviesContainer);
    // Рендерим представление фильтра перед контейнером фильмов
    render(new FilterView(), this.moviesContainer, RenderPosition.BEFOREBEGIN);
    // Рендерим представление сортировки внутри контейнера фильмов в начало
    render(new SortView(), this.moviesContainer, RenderPosition.AFTERBEGIN);

    // Рендерим первые 6 карточек фильмов в контейнер фильмов
    for (let i = 0; i < 6; i++) {
      render(new MovieCardView(this.movies[i]), document.querySelector('.films'));
    }
    // Рендерим попап фильма в элемент body
    render(new MoviePopupView(this.popupMovie), this.bodyElement);
    // Рендерим кнопку "Показать больше" в контейнер фильмов
    render(new ShowMoreView(), document.querySelector('.films'));
  };
}

