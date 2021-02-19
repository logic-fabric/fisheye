"use strict";

export class MediaFiltersDropdownMenu {
  constructor(options) {
    this.options = options;
  }

  get html() {
    return `<label for="media-filter">Trier par</label>
            <select id="media-filter" name="media-filter">
              <option value="date">Date</option>
              <option value="popularity">Popularité</option>
              <option value="title">Titre</option>
            </select>`;
  }
}
