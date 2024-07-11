import {render} from './render.js';
import ProfileView from './view/profile-view.js';
import MainPresenter from './presenter/main-presenter';
import MovieCardModel from './model/MovieCardModel';
import MoviePopupModel from './model/MoviePopupModel';

const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

const presenter= new MainPresenter();
const movieModel = new MovieCardModel();
const moviePopupModel = new MoviePopupModel();

presenter.init(siteMainElement, movieModel, moviePopupModel);
