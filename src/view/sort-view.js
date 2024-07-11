import {createElement} from '../render.js';

const createFiltersTemplate = () => `
 <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>
`;

export default class SortView {
  #element;
  // Геттер для шаблона
  get template() {
    return createFiltersTemplate();
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
