import AbstractView from '../framework/view/abstract-view';

const createMoviesViewTemplate = () => '<section class="films"></section>';

export default class MoviesView extends AbstractView{
  constructor() {
    super();
  }

  // Геттер для шаблона
  get template() {
    return createMoviesViewTemplate();
  }
}

