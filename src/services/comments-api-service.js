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

  addComment = async (comment) => {
    const response = await this._load({
      url: 'comments',
      method: Methods.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'})
    })
  }

  deleteComment = async (update) => {

  }
}
