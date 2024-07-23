import AbstractView from '../framework/view/abstract-view';

const createFilterViewTemplate = () => {

  return (`<nav class="main-navigation">
<!--    <a href="#all" class="main-navigation__item main-navigation__item&#45;&#45;active">All movies</a>-->
<!--    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>-->
<!--    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>-->
<!--    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>-->
        ${filters.map((filter) => `<a href="#${filter.toLowerCase()}" class="main-navigation__item">${filter}</a>`).join('')}
  </nav>`);
};

export default class FilterView extends AbstractView{
  constructor() {
    super();
  }

  // Геттер для шаблона
  get template() {
    return createFilterViewTemplate();
  }
}

