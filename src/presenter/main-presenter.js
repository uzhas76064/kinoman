import {render, RenderPosition} from '../render';
import FilmCardView from '../view/film-card-view';
import ShowMoreView from '../view/show-more-view';
import FilmsView from "../view/films-view";
import FilterView from "../view/filter-view";
import SortView from "../view/sort-view";

export default class MainPresenter {
  films = new FilmsView();
  filmsContainer = document.querySelector('.films');

  init = (container) => {
    this.filmsContainer = container;
    console.log(this.films.getElement())

    render(new FilmsView(), this.filmsContainer);
    render(new FilterView(), this.filmsContainer, RenderPosition.BEFOREBEGIN);
    render(new SortView(), this.filmsContainer, RenderPosition.AFTERBEGIN);

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), document.querySelector('.films'));
    }
    console.log(this.films.getElement());
    render(new ShowMoreView(), document.querySelector('.films'));
  };
}
