import {remove, render, replace} from "../framework/render";
import FilmDetailsView from "../view/film-details-view";
import {UpdateType, UserAction, UserAction as serAction} from "../const";
import {nanoid} from "nanoid";

export default class FilmDetailsPresenter {
  #container = null;
  #changeData = null;
  #closeBtnClickHandler = null;
  #escKeyHandler = null;
  #filmDetailsComponent = null;
  #film = null;
  #comments = null;

  #localCommentViewData = {
    comment: null,
    emotion: null,
    scrollPosition: 0
  }

  constructor (container, changeData, closeBtnClickHandler, escKeyHandler) {
    this.#container = container;
    this.#changeData = changeData;
    this.#closeBtnClickHandler = closeBtnClickHandler;
    this.#escKeyHandler = escKeyHandler;
  }

  clearLocalCommentViewData = () => {
    this.updateLocalCommentViewData({
      comment: null,
      emotion: null,
      scrollPosition: this.#localCommentViewData.scrollPosition
    });
  };

  init = (films, comments) => {
    this.#film = films;
    this.#comments = comments;
    const prevFilmDetailsComponent = this.#filmDetailsComponent;

    this.#filmDetailsComponent = new FilmDetailsView(
      this.#film,
      this.#comments,
      this.#localCommentViewData,
      this.updateLocalCommentViewData);

    this.#filmDetailsComponent.setCloseBtnClickHandler(() => {
      this.#closeBtnClickHandler();
      document.removeEventListener('keydown', this.#escKeyHandler);
    });
    this.#filmDetailsComponent.setAddToWatchListHandler(this.#onAddToWatchList)
    this.#filmDetailsComponent.setWatchedHandler(this.#onSetWatched)
    this.#filmDetailsComponent.setFavoriteHandler(this.#onSetFavorite)
    this.#filmDetailsComponent.setCommentDeleteClickHandler(this.#commentDeleteClickHandler);


    if (prevFilmDetailsComponent === null) {
      render(this.#filmDetailsComponent, this.#container);
      return;
    }

    replace(this.#filmDetailsComponent, prevFilmDetailsComponent);

    this.#filmDetailsComponent.setScrollPosition();

    remove(prevFilmDetailsComponent);
  }

  destroy = () => {
    remove(this.#filmDetailsComponent);
  }

  createComment = () => {
    this.#filmDetailsComponent.setCommentData();

    const {emotion, comment} = this.#localCommentViewData;

    if (emotion && comment) {
      const newCommentId = nanoid();

      const createdComment = {
        id: newCommentId,
        author: 'Olof',
        date: new Date(),
        emotion,
        comment
      };

      this.#changeData(
        UserAction.ADD_COMMENT,
        UpdateType.PATCH,
        {
          ...this.#film,
          comments: [
            ...this.#film.comments,
            newCommentId
          ]
        },
        createdComment
      );
    }
  }

  updateLocalCommentViewData = (viewData) => {
    this.#localCommentViewData = {...viewData}
  }

  #commentDeleteClickHandler = (commentId) => {
    const filmCommentIdIndex = this.#film.comments
      .findIndex((filmCommentId) => filmCommentId === commentId);

    const deletedComment = this.#comments
      .find((comment) => comment.id === commentId);

    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {
        ...this.#film,
        comments: [
          ...this.#film.comments.slice(0, filmCommentIdIndex),
          ...this.#film.comments.slice(filmCommentIdIndex + 1)
        ]
      },
      deletedComment
    );
  };

  #onAddToWatchList = () => {
    console.log('watchlist')
    this.#changeData(
      serAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
        ...this.#film,
        userDetails: {
          ...this.#film.userDetails,
          watchlist: !this.#film.userDetails.watchlist
        },
      })
  }

  #onSetWatched = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        alreadyWatched: !this.#film.userDetails.alreadyWatched,

      }
    })
  }

  #onSetFavorite = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      {
      ...this.#film,
      userDetails: {
        ...this.#film.userDetails,
        favorite: !this.#film.userDetails.favorite,
      }
    })
  }
}
