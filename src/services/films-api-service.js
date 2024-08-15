import ApiService from "../framework/api-service";

const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
}

export default class FilmsApiService extends ApiService{
  get films() {
    return this._load({url: '/movies'})
      .then(ApiService.parseResponse);
  }

  updateFilms = async (film) => {
    const response = await this._load({
      url: `/movies/${film.id}`,
      method: METHODS.PUT,
      body: JSON.stringify(film),
      headers: new Headers({'Content-Type': 'application/json'})
    })

    return await ApiService.parseResponse(response);
  }

  #adaptToServer = (film) => {
    const adaptedFilm = {
      ...film,

    }
  }
}
