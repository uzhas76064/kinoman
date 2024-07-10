import {generateMovie} from '../mock/mock';

export default class MoviePopupModel {
  #moviePopup= generateMovie();

  get moviePopup() {
    return  this.#moviePopup;
  }
}
