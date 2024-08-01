import AbstractView from '../framework/view/abstract-view';

const createMoviesViewTemplate = () => '<section class="films"></section>';

export default class FilmsView extends AbstractView{
  constructor() {
    super();
  }

  // Геттер для шаблона
  get template() {
    return createMoviesViewTemplate();
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.addEventListener('click', this.#onClickHandler);
  };

  #onClickHandler = (evt) => {
    this._callback.click(evt);
  };
}

