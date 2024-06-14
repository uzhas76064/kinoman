import FilmsView from './view/films-view.js';
import {render, RenderPosition} from './render.js';
import FilmCardView from './view/film-card-view.js';
import SortView from './view/sort-view.js';
import ProfileView from './view/profile-view.js';
import FilterView from './view/filter-view';
import ShowMoreView from './view/show-more-view';
import FilmPopupView from './view/film-popup-view';

const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);
render(new FilmsView(), siteMainElement);
render(new FilterView(), siteMainElement, RenderPosition.BEFOREBEGIN);
render(new SortView(), siteMainElement, RenderPosition.AFTERBEGIN);
render(new FilmPopupView(), bodyElement);

const sectionFilms = document.querySelector('.films');

render(new FilmCardView(), sectionFilms);
render(new ShowMoreView(), sectionFilms);
