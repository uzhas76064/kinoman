import {createElement} from '../render';

const createMoviesViewTemplate = () => '<section class="films"></section>';

export default class MoviesView {
  // Геттер для шаблона
  get template() {
    return createMoviesViewTemplate();
  }

  // Геттер для элемента
  get element() {
    // Если элемент не существует, создаем его
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  // Метод для удаления элемента
  removeElement() {
    this._element = null;
  }
}

