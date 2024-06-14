import FilmsView from './view/films-view.js';
import {render, RenderPosition} from './render.js';
import FilmCardView from './view/film-card-view.js';
import SortView from "./view/sort-view.js";

const siteMainElement = document.querySelector('.main');

render(new FilmsView(), siteMainElement);
render(new SortView(), siteMainElement, RenderPosition.BEFOREBEGIN);

const sectionFilms = document.querySelector('.films');

render(new FilmCardView(), sectionFilms);
