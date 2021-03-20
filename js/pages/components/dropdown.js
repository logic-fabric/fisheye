"use strict";

const SORTING_CRITERIONS = {
  date: "Date",
  likes: "Popularité",
  title: "Titre",
};

export class MediaSortingDropdownMenu {
  constructor(currentCriterion) {
    this._sortingCriterions = SORTING_CRITERIONS;
    this._currentCriterion = currentCriterion;
  }

  _customOptionsHtml() {
    let htmlContent = `<p class="c-dropdown__option" 
                          data-criterion="${this._currentCriterion}">
                        ${this._sortingCriterions[this._currentCriterion]}
                      </p>
                      <i class="fas fa-chevron-down"></i>`;

    Object.keys(this._sortingCriterions).forEach((criterion) => {
      htmlContent +=
        criterion === this._currentCriterion
          ? ""
          : `<p class="c-dropdown__option" data-criterion="${criterion}">
              ${this._sortingCriterions[criterion]}
            </p>`;
    });

    return htmlContent;
  }

  get html() {
    return `<div class="c-dropdown">
              <label for="sorting-listbox">Trier par</label>
              <select class="c-dropdown--sr-only sr-only">
                <option value="date">Date</option>
                <option value="likes">Popularité</option>
                <option value="title">Titre</option>
              </select>
              <div class="c-dropdown--custom__wrapper">
                <div class="c-dropdown--custom">
                  ${this._customOptionsHtml(this._currentCriterion)}
                </div>
              </div>
            </div>`;
  }

  openDropdownMenu(selectedSortingCriterion) {
    console.log(
      `OPEN dropdownMenu | selected sorting criterion = "${selectedSortingCriterion}"`
    );

    const customSelect = document.querySelector(".c-dropdown--custom");
    customSelect.innerHTML = this._customOptionsHtml(selectedSortingCriterion);

    const customOptions = document.getElementsByClassName("c-dropdown__option");

    for (let option of customOptions) {
      const sortingCriterion = option.getAttribute("data-criterion");

      option.classList.add("displayed");

      if (sortingCriterion === selectedSortingCriterion) {
        option.classList.add("selected-criterion");
      } else {
        option.classList.remove("selected-criterion");
      }
    }
  }

  closeDropdownMenu(selectedSortingCriterion) {
    console.log(
      `CLOSE dropdownMenu | selected sorting criterion = "${selectedSortingCriterion}"`
    );

    const customOptions = document.getElementsByClassName("c-dropdown__option");

    for (let option of customOptions) {
      const sortingCriterion = option.getAttribute("data-criterion");

      if (sortingCriterion === selectedSortingCriterion) {
        option.classList.add("displayed", "selected-criterion");
      } else {
        option.classList.remove("displayed", "selected-criterion");
      }
    }
  }
}
