import {render} from './render.js';
import ProfileView from './view/profile-view.js';
// import FilmPopupView from './view/film-popup-view';
import MainPresenter from './presenter/main-presenter';

// const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

// render(new FilmPopupView(), bodyElement);

const presenter= new MainPresenter();
presenter.init(siteMainElement);
