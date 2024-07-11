import {createElement} from '../render';

const createShowMoreView = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreView {
  #element;
  // Геттер для шаблона
  get template() {
    return createShowMoreView();
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

