import {createElement} from '../render';

const createNewListTemplate = () => '<section class="films"></section>';

export default class FilmsView {
  getTemplate () {
    return createNewListTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
  removeElement () {
    this.element = null;
  }
}
