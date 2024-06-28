import {render} from './render.js';
import ProfileView from './view/profile-view.js';
// import MoviePopupView from './view/film-popup-view';
import MainPresenter from './presenter/main-presenter';
import MovieCardModel from './model/MovieCardModel';

// const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

// render(new MoviePopupView(), bodyElement);

const presenter= new MainPresenter();
const movieModel = new MovieCardModel();

presenter.init(siteMainElement, movieModel);
