import {createElement} from '../render';

const createMoviesViewTemplate = () => '<section class="films"></section>';

export default class MoviesView {
  #element;
  // Геттер для шаблона
  get template() {
    return createMoviesViewTemplate();
  }

  // Геттер для элемента
  get element() {
    // Если элемент не существует, создаем его
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  // Метод для удаления элемента
  removeElement() {
    this.#element.remove();
    // this.#element = null;
  }
}

