import AbstractView from '../framework/view/abstract-view.js';
import {FILTER_TYPE_ALL_NAME, FilterType} from '../const.js';

const createFilterItemTemplate = ({name, count}, currentFilter) => {
  const getFilterName = (filterName) =>
    (filterName === FilterType.ALL)
      ? FILTER_TYPE_ALL_NAME
      : `${filterName.charAt(0).toUpperCase()}${filterName.slice(1)}`;

  const getFilterTextContent = (filterName) =>
    (filterName !== FilterType.ALL)
      ? `<span class="main-navigation__item-count">${count}</span>`
      : '';

  return `
    <a
      href="#${name}"
      class="
        main-navigation__item
        ${(name === currentFilter) ? 'main-navigation__item--active' : ''}
      "
      data-filter-type=${name}
    >
      ${getFilterName(name)}
      ${getFilterTextContent(name)}
    </a>
  `;
};

const createFilterViewTemplate = (filters, currentFilter) => {
  const filterItems = filters
    .map((filter) => createFilterItemTemplate(filter, currentFilter))
    .join('');

  return `
    <nav class="main-navigation">
      ${filterItems}
    </nav>
  `;
};

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilter) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFilterViewTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeClickHandler(callback) {
    this._callback.filterTypeClick = callback;
    this.element
      .addEventListener('click', this.#filterTypeClickHandler);
  }

  #filterTypeClickHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.filterTypeClick(evt.target.dataset.filterType);
  };
}
