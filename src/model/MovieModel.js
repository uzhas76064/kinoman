import {generateComment, generateMovie} from '../mock/mock';

export default class MovieModel {
  movies = Array.from({length: 3}, generateMovie);
  comments = Array.from({length: 3}, generateComment);

  getMovies = () => this.movies;

  getComments = () => this.comments;
}
