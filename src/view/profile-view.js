import {createElement} from '../render';

const createProfileViewTemplate = () => ` <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class ProfileView {
  // Геттер для шаблона
  get template() {
    return createProfileViewTemplate();
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

