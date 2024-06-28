import {generateMovie} from '../mock/mock';

export default class MoviePopupModel {
  _moviePopup = generateMovie();

  getMoviePopup = () => this._moviePopup;
}
