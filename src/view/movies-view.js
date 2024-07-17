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

  setClickHandler = (callback) => {
    console.log(1)
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onClickHandler);
    console.log(this.element)
  };

  #onClickHandler = () => {
    console.log(3)
    this._callback.click();
  };
}

