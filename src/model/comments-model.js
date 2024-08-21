import Observable from "../framework/observable";

export default class CommentsModel extends Observable{
  #commentsApiService = null;
  #allComments = [];
  #comments = [];

  constructor(apiService) {
    super();
    this.#commentsApiService = apiService;
  }

  get = async (film) => {
    this.#comments = await this.#commentsApiService.get(film);
    return this.#comments;
  };

  add = (updateType, update) => {
    this.#allComments.push(update);
    this._notify(updateType, update);
  };

  delete = (updateType, update) => {
    const index = this.#allComments.findIndex(
      (comment) => comment.id === update.id
    );

    if (index === -1) {
      throw new Error('Can\'t delete not existing comment');
    }

    this.#allComments = [
      ...this.#allComments.slice(0, index),
      ...this.#allComments.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
