import {render} from './framework/render';
import ProfileView from './view/profile-view.js';
import FilmsPresenter from './presenter/films-presenter';
import FilmsModel from './model/films-model';
import CommentsModel from './model/comments-model';
import FilterPresenter from "./presenter/filter-presenter";
import FilterModel from "./model/filter-model";
import FilmsApiService from "./services/films-api-service";

const BASIC_ID = '1ge6sw36fv7';

const END_POINT = 'https://17.ecmascript.htmlacademy.pro/cinemaddict';
const AUTHORIZATION = `Basic ${BASIC_ID}`

const siteMainElement = document.querySelector('.main');
const headerElement = document.querySelector('.header');

render(new ProfileView(), headerElement);

const filmsModel = new FilmsModel({
  filmApiService: new FilmsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
const commentsModel = new CommentsModel(filmsModel);

const filterPresenter = new FilterPresenter(siteMainElement, filmsModel, filterModel);
const filmsPresenter= new FilmsPresenter(siteMainElement, filmsModel, commentsModel, filterModel);

filterPresenter.init();
filmsPresenter.init();
filmsModel.init();
