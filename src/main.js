import FilmsView from './view/films-view.js';
import {render, RenderPosition} from './render.js';
import FilmCardView from './view/film-card-view.js';
import SortView from './view/sort-view.js';
import ProfileView from './view/profile-view.js';

const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);
render(new FilmsView(), siteMainElement);
render(new SortView(), siteMainElement, RenderPosition.BEFOREBEGIN);

const sectionFilms = document.querySelector('.films');

render(new FilmCardView(), sectionFilms);
