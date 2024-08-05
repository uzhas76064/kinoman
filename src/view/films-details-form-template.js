import {Emojis} from '../const';

const createEmotionItem = (emotionItem) =>
  `
    <input
      class="film-details__emoji-item visually-hidden"
      name="comment-emoji"
      type="radio"
      id="emoji-${emotionItem}"
      value="${emotionItem}"
    >
    <label class="film-details__emoji-label" data-emotion-type="${emotionItem}" for="emoji-${emotionItem}">
      <img
        src="./images/emoji/${emotionItem}.png"
        width="30"
        height="30"
        alt="emoji"
      />
    </label>
  `;

export const createFilmDetailsFormTemplate = (emotion) => {
  const isEmotionChosen = emotion === null ? '' : `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">`

  return (
    `<form class="film-details__new-comment"  action="" method="get">
      <div class="film-details__add-emoji-label">
            ${isEmotionChosen}
       </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
      </label>

      <div class="film-details__emoji-list">
        ${Emojis.map(createEmotionItem).join('')}
      </div>
    </form>
  `
  )
}

