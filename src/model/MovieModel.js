import {generateComment, generateMovie} from '../mock/mock';

export default class MovieModel {
  movies = Array.from({length: 6}, generateMovie);
  comments = Array.from({length: 4}, generateComment);

  getMovies = () => this.movies;

  getComments = () => this.comments;
}
