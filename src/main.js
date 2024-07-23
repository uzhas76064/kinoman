import {render} from './framework/render';
import ProfileView from './view/profile-view.js';
import FilmsPresenter from './presenter/films-presenter';
import MovieCardModel from './model/movie-card-model';
import CommentsModel from './model/comments-model';

const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

const movieModel = new MovieCardModel();
const commentsModel = new CommentsModel(movieModel);
const presenter= new FilmsPresenter(siteMainElement, movieModel, commentsModel);

presenter.init();
