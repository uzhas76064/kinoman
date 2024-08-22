import Observable from "../framework/observable";

export default class CommentsModel extends Observable{
  #commentsApiService = null;
  #comments = [];
  #filmsModel = null;

  constructor(apiService, filmsModel) {
    super();
    this.#commentsApiService = apiService;
    this.#filmsModel = filmsModel;
  }

  get = async (film) => {
    this.#comments = await this.#commentsApiService.get(film);
    return this.#comments;
  };

  add = async (updateType, film, createdComment) => {
    try {
      const response = await this.#commentsApiService.addComment(film, createdComment);

      this.#comments = response.comments;

      await this.#filmsModel.updateOnClient({
        updateType,
        update: response.movie,
        isAdapted: false
      });
    } catch {
      throw new Error('Can\'t add comment');
    }
  };

  delete = async (updateType, film, deletedComment) => {
    const index = this.#comments.findIndex(
      (comment) => comment.id === deletedComment.id
    );

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      await this.#commentsApiService.deleteComment(deletedComment);

      const updateFilm = {
        ...film,
        comments: [
          ...film.comments.slice(0, index),
          ...film.comments.slice(index + 1)
        ]
      };

      await this.#filmsModel.updateOnClient({
        updateType,
        update: updateFilm,
        isAdapted: true
      });
    } catch {
      throw new Error('Can\'t delete comment');
    }
  };
}
