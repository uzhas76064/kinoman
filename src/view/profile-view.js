import AbstractView from '../framework/view/abstract-view';

const createProfileViewTemplate = () => ` <section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class ProfileView extends AbstractView{
  constructor() {
    super();
  }
  #element;
  // Геттер для шаблона
  get template() {
    return createProfileViewTemplate();
  }
}

