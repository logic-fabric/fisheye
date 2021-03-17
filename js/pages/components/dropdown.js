"use strict";

const SORTING_CRITERIONS = {
  date: "Date",
  likes: "Popularité",
  title: "Titre",
};

export class MediaSortingDropdownMenu {
  constructor() {
    this._sortingCriterions = SORTING_CRITERIONS;
  }

  _customOptionsHtml(currentSortingCriterion) {
    let htmlContent = `<p class="p-dropdown__option" 
                          data-criterion="${currentSortingCriterion}">
                        ${this._sortingCriterions[currentSortingCriterion]}
                      </p>`;

    Object.keys(this._sortingCriterions).forEach((criterion) => {
      htmlContent +=
        criterion === currentSortingCriterion
          ? ""
          : `<p class="p-dropdown__option" data-criterion="${criterion}">
              ${this._sortingCriterions[criterion]}
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

  openDropdownMenu(selectedSortingCriterion) {
    console.log(`OPEN dropdownMenu | selected sorting criterion = "${selectedSortingCriterion}"`);

    const customSelect = document.querySelector(".p-dropdown--custom");
    customSelect.innerHTML = this._customOptionsHtml(selectedSortingCriterion);

    const customOptions = document.getElementsByClassName("p-dropdown__option");

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
    console.log(`CLOSE dropdownMenu | selected sorting criterion = "${selectedSortingCriterion}"`);

    const customOptions = document.getElementsByClassName("p-dropdown__option");

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
