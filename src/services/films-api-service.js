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

  #deleteUnusedProps = (obj) => {
    delete obj.alternativeTitle;
    delete obj.totalRating;
    delete obj.ageRating;
    delete obj.release.releaseCountry;
    delete obj.user_details.watchList;
    delete obj.user_details.alreadyWatched;
    delete obj.user_details.watchingDate;
  }

  updateFilms = async (film) => {
    const response = await this._load({
      url: `/movies/${film.id}`,
      method: METHODS.PUT,
      body: JSON.stringify(FilmsApiService.adaptToServer(film)),
      headers: new Headers({'Content-Type': 'application/json'})
    })

    return await ApiService.parseResponse(response);
  }

  static adaptToServer = (film) => {
    const filmInfo = film.filmInfo

    const adaptedFilm = {
      ...film,
      'film_info': {
        ...filmInfo,
        'alternative_title': filmInfo.alternativeTitle,
        'total_rating': filmInfo.totalRating,
        'age_rating': filmInfo.ageRating,
        release: {
          ...filmInfo.release,
          'release_country': filmInfo.release.releaseCountry
        },
        'user_details': {
          ...filmInfo.userDetails,
          'watchlist': filmInfo.userDetails.watchList,
          'already_watched': filmInfo.userDetails.alreadyWatched,
          'watching_date': filmInfo.userDetails.watchingDate
        }
      }
    }

    this.#deleteUnusedProps(adaptedFilm);

    return adaptedFilm;
  }
}
