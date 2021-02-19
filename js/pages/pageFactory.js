"use strict";

import { HomePageBuilder } from "./homePageBuilder.js";
import { PhotographerPageBuilder } from "./photographerPageBuilder.js";

export class PageFactory {
  constructor(photographersList, mediaList) {
    this.photographersList = photographersList;
    this.photographersTags = photographersList.collectSortedTags();

    this.mediaList = mediaList;
  }

  render(photographer, checkedTag) {
    if (photographer) {
      const page = new PhotographerPageBuilder(
        photographer,
        this.mediaList,
        checkedTag
      );
      page.render();
    } else {
      const page = new HomePageBuilder(this.photographersList, checkedTag);
      page.render();
    }
  }
}
