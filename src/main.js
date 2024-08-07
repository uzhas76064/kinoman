import {render} from './framework/render';
import ProfileView from './view/profile-view.js';
import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import {generateFilter} from './mock/filter';
import FilterView from './view/filter-view';

const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

const filmsModel = new FilmsModel();
const filters = generateFilter(filmsModel.movies);

render(new FilterView(filters), siteMainElement);
const commentsModel = new CommentsModel(filmsModel);
const presenter= new FilmsPresenter(siteMainElement, filmsModel, commentsModel);

presenter.init();
