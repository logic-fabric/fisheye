"use strict";

export class MediaFiltersDropdownMenu {
  constructor(options) {
    this._options = options;
  }

  get html() {
    return `<div class="p-dropdown">
              <label id="lisbox-label" for="sorting-listbox">Trier par</label>
              <select id="sorting-dropdown">
                <option value="date">Date</option>
                <option value="likes">Popularité</option>
                <option value="title">Titre</option>
              </select>
            </div>`;
  }
}
