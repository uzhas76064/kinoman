import {render} from './framework/render';
import ProfileView from './view/profile-view.js';
import FilmsPresenter from './presenter/films-presenter';
import MovieCardModel from './model/movie-card-model';
import CommentsModel from './model/comments-model';
import {generateFilter} from './mock/filter';
import FilterView from './view/filter-view';

const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

const movieModel = new MovieCardModel();
const filters = generateFilter(movieModel.movies);

render(new FilterView(filters), siteMainElement);
const commentsModel = new CommentsModel(movieModel);
const presenter= new FilmsPresenter(siteMainElement, movieModel, commentsModel);

presenter.init();
