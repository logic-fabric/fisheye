"use strict";

const FILTERS = {
  date: "Date",
  likes: "Popularité",
  title: "Titre",
};

export class MediaFiltersDropdownMenu {
  constructor() {
    this._filters = FILTERS;
  }

  _customOptionsHtml(currentFilter) {
    let htmlContent = `<p class="p-dropdown__option" 
                          data-filter="${currentFilter}">
                        ${this._filters[currentFilter]}
                      </p>`;

    Object.keys(this._filters).forEach((filter) => {
      htmlContent +=
        filter === currentFilter
          ? ""
          : `<p class="p-dropdown__option" data-filter="${filter}">
              ${this._filters[filter]}
            </p>`;
    });

    return htmlContent;
  }

  get html() {
    return `<div class="p-dropdown">
              <label for="sorting-listbox">Trier par</label>
              <select class="p-dropdown--sr-only">
                <option value="date">Date</option>
                <option value="likes">Popularité</option>
                <option value="title">Titre</option>
              </select>
              <div class="p-dropdown--custom">
                ${this._customOptionsHtml("date")}
              </div>
            </div>`;
  }

  openDropdownMenu(selectedFilter) {
    console.log(`OPEN dropdownMenu | selected filter = "${selectedFilter}"`);

    const customSelect = document.querySelector(".p-dropdown--custom");
    customSelect.innerHTML = this._customOptionsHtml(selectedFilter);

    const customOptions = document.getElementsByClassName("p-dropdown__option");

    for (let option of customOptions) {
      const filter = option.getAttribute("data-filter");

      option.classList.add("displayed");

      if (filter === selectedFilter) {
        option.classList.add("selected-filter");
      } else {
        option.classList.remove("selected-filter");
      }
    }
  }

  closeDropdownMenu(selectedFilter) {
    console.log(`CLOSE dropdownMenu | selected filter = "${selectedFilter}"`);

    const customOptions = document.getElementsByClassName("p-dropdown__option");

    for (let option of customOptions) {
      const filter = option.getAttribute("data-filter");

      if (filter === selectedFilter) {
        option.classList.add("displayed", "selected-filter");
      } else {
        option.classList.remove("displayed", "selected-filter");
      }
    }
  }
}
