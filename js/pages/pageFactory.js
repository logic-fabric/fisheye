"use strict";

import { HomePageBuilder } from "./homePageBuilder.js";
import { PhotographerPageBuilder } from "./photographerPageBuilder.js";

export class PageFactory {
  /**
   * @constructs
   * @param {PhotographersList} photographersList 
   * @param {MediaList} mediaList 
   */
  constructor(photographersList, mediaList) {
    this._photographersList = photographersList;
    this._mediaList = mediaList;
  }

  /**
   * Rebuild the page with a PhotographerPageBuilder or a HomePageBuilder, depending the parameters.
   * @param {string} photographer 
   * @param {string} checkedTag 
   * @param {string} sortingCriterion 
   */
  render(photographer, checkedTag, sortingCriterion) {
    if (!checkedTag) {
      window.scrollTo(0, 0);
    }

    let pageToBuild;

    if (photographer) {
      document.title = `FishEye | ${photographer.name}`;

      pageToBuild = new PhotographerPageBuilder(
        photographer,
        this._mediaList,
        checkedTag,
        sortingCriterion
      );
    } else {
      document.title = "FishEye";
      pageToBuild = new HomePageBuilder(this._photographersList, checkedTag);
    }

    pageToBuild.render();
    this._addUpButtonEvents();
  }

  _addUpButtonEvents() {
    const upButton = document.getElementById("up-button");
    const mainContent = document.getElementById("main-content");

    window.addEventListener("scroll", () => {
      const mainRect = mainContent.getBoundingClientRect();

      if (mainRect.top < 60) {
        upButton.classList.add("visible");
      } else {
        upButton.classList.remove("visible");
      }
    });

    upButton.onclick = () => {
      window.scrollTo(0, 0);
    };
  }
}
