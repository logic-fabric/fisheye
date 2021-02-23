"use strict";

export class MediaFiltersDropdownMenu {
  constructor(options) {
    this.options = options;
  }

  get html() {
    return `<div class="p-dropdown">
              <label id="lisbox-label" for="sorting-listbox">Trier par</label>
              <div role="listbox" id="sorting-dropdown" 
                  aria-activedescendant="mistbox-date">
                <button class="selected" id="listbox-date" role="option"
                        aria-haspopup="listbox" aria-expanded="false"
                        aria-selected="true" aria-labelledby="listbox-label">
                  Date
                  <i class="fas fa-chevron-down"></i>
                </button>
                <div class="p-dropdown__divider expandable"></div>
                <button class="expandable" id="listbox-popularity" role="option"
                        aria-labelledby="listbox-label">
                  Popularité
                </button>
                <div class="p-dropdown__divider expandable"></div>
                <button class="expandable" id="listbox-title" role="option"
                        aria-labelledby="listbox-label">
                  Titre
                </button>
              </div>
            </div>`;
  }
}
