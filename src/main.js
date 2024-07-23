import {render} from './framework/render';
import ProfileView from './view/profile-view.js';
import FilmsPresenter from './presenter/films-presenter';
import MovieCardModel from './model/MovieCardModel';
import MoviePopupModel from './model/MoviePopupModel';

const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

const presenter= new FilmsPresenter();
const movieModel = new MovieCardModel();
const moviePopupModel = new MoviePopupModel();

presenter.init(siteMainElement, movieModel, moviePopupModel);
