import ApiService from "../framework/api-service";

export default class CommentsApiService extends ApiService {
  get = (film) => {
    return this._load({url: `/comments/${film.id}`})
      .then(ApiService.parseResponse)
      .catch(() => null)
  }
}
