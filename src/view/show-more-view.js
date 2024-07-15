import AbstractView from '../framework/view/abstract-view';

const createShowMoreView = () => `<button class="films-list__show-more">Show more</button>`;

export default class ShowMoreView extends AbstractView{
  constructor() {
    super();
  }
  // Геттер для шаблона
  get template() {
    return createShowMoreView();
  }
}

