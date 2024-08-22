import ApiService from "../framework/api-service";

const Methods = {
  POST: 'POST',
  DELETE: 'DELETE'
}

export default class CommentsApiService extends ApiService {
  get = (film) => {
    return this._load({url: `/comments/${film.id}`})
      .then(ApiService.parseResponse)
      .catch(() => null)
  }

  addComment = async (film, comment) => {
    const response = await this._load({
      url: `comments/${film.id}`,
      method: Methods.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'})
    });

    return await ApiService.parseResponse(response);
  }

  deleteComment = async (comment) => {
    await this._load({
      url: `comments/${comment.id}`,
      method: Methods.DELETE,
      headers: new Headers({'Content-Type': 'application/json'})
    });
  }
}
