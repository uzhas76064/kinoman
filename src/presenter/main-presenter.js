import {render, RenderPosition} from '../render';
import MovieCardView from '../view/movie-card-view';
import ShowMoreView from '../view/show-more-view';
import MoviesView from '../view/movies-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';

export default class MainPresenter {
  films = new MoviesView();
  filmsContainer = document.querySelector('.films');

  init = (container, moviesModel) => {
    this.filmsContainer = container;
    this.moviesModel = moviesModel;
    this.movies = [...this.moviesModel.getMovies()];

    render(new MoviesView(), this.filmsContainer);
    render(new FilterView(), this.filmsContainer, RenderPosition.BEFOREBEGIN);
    render(new SortView(), this.filmsContainer, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 6; i++) {
      render(new MovieCardView(this.movies[i]), document.querySelector('.films'));
    }
    render(new ShowMoreView(), document.querySelector('.films'));
  };
}
