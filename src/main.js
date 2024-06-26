import {render} from './render.js';
import ProfileView from './view/profile-view.js';
// import FilmPopupView from './view/film-popup-view';
import MainPresenter from './presenter/main-presenter';
import {generateComment, generateMovie} from "./mock/mock";
import MovieModel from "./model/MovieModel";

// const bodyElement = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

// render(new FilmPopupView(), bodyElement);

const presenter= new MainPresenter();
const movieModel = new MovieModel();

presenter.init(siteMainElement);
