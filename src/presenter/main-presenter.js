import {render, RenderPosition} from '../framework/render';
import MovieCardView from '../view/movie-card-view';
import ShowMoreView from '../view/show-more-view';
import MoviesView from '../view/movies-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import MoviePopupView from '../view/movie-popup-view';
import {remove} from '../framework/render';

export default class MainPresenter {
  films = new MoviesView();
  moviesContainer = document.querySelector('.films');
  bodyElement = document.querySelector('body');
  #MOVIES_PER_PORTION = 5;
  #shownMovies = 0;
  #showMoreButton = new ShowMoreView();

  #renderMovieCard(mv) {
    const movieCard = new MovieCardView(mv);
    const container = document.querySelector('.films');

    render(movieCard, container);
    // movieCard.setOpenPopupHandler(() => {
    //   this.#renderMoviePopup(mv);
    // });
  }

  #onClosePopup(popup) {
    this.bodyElement.classList.remove('hide-overflow');
    // this.moviesContainer.removeEventListener('click', this.#onClosePopup);
    remove(popup);
  }

  #onOpenPopup(popup, evt) {
    if (evt.target.matches('.film-card')) {
      this.bodyElement.appendChild(popup.element);
      this.bodyElement.classList.add('hide-overflow');
      popup.setClosePopupHandler(() => {this.#onClosePopup(popup);});
    }
  }

  #onEscKeyDown(popup, evt) {
    evt.preventDefault();
    if(evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#onClosePopup(popup);
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  }

  #renderMoviePopup(mvInfo) {
    const popup =  new MoviePopupView(mvInfo);

    this.moviesContainer.addEventListener('click',(evt) => {
      console.log(2)
      this.#onOpenPopup(popup, evt);
      document.addEventListener('keydown', (e) => {this.#onEscKeyDown(popup, e);});
    });
  }

  #renderMovies(movies) {
    const moviesToShow = movies.slice(this.#shownMovies, this.#shownMovies + this.#MOVIES_PER_PORTION);
    moviesToShow.forEach((movie) => {
      this.#renderMovieCard(movie);
    });
    this.#shownMovies += moviesToShow.length;

    if (this.#shownMovies < movies.length) {
      this.#renderShowMoreButton(movies);
    } else if (movies.length === 0) {
      const noMoviesMessage = document.createElement('h2');
      noMoviesMessage.classList.add('films-list__title');
      noMoviesMessage.textContent = 'There are no movies in our database';
      this.moviesContainer.appendChild(noMoviesMessage);
    }
  }

  #renderShowMoreButton(movies) {
    render(this.#showMoreButton, document.querySelector('.films'));

    // здесь this ссылается сначала на #renderShowMoreButton
    this.#showMoreButton.setClickHandler(() => {
      remove(this.#showMoreButton); // Удаляем кнопку перед рендером новых фильмов
      this.#renderMovies(movies);
    });
  }

  // Метод инициализации, принимающий контейнер и модели фильмов и попапа
  init = (container, moviesModel, moviePopupModel) => {
    this.moviesContainer = container;
    this.moviesModel = moviesModel;
    this.moviePopupModel = moviePopupModel;
    // Получаем список фильмов из модели и сохраняем его в свойство класса
    this.movies = [...this.moviesModel.movies];
    // Получаем данные для попапа из модели и сохраняем их в свойство класса
    this.popupMovie = this.moviePopupModel.moviePopup;

    render(new MoviesView(), this.moviesContainer);
    render(new FilterView(), this.moviesContainer, RenderPosition.BEFOREBEGIN);
    render(new SortView(), this.moviesContainer, RenderPosition.AFTERBEGIN);

    this.#renderMovies(this.movies);
    this.#renderMoviePopup(this.popupMovie);
  };
}

