import {createElement} from '../render';

const createShowMoreView = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreView {
  // Геттер для шаблона
  get template() {
    return createShowMoreView();
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

