import AbstractView from "../framework/view/abstract-view";

const createLoadingViewTemplate = () => `<h2 class="films-list__title">Loading...</h2>`;

export default class LoadingView extends AbstractView{

  get template() {
    return createLoadingViewTemplate();
  }
}
