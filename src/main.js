import FilmsView from './view/films-view.js';
import {render} from './render.js';

const siteMainElement = document.querySelector('.main');

render(new FilmsView(), siteMainElement);
