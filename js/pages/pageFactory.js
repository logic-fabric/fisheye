"use strict";

import { HomePageBuilder } from "./homePageBuilder.js";
import { PhotographerPageBuilder } from "./photographerPageBuilder.js";

export class PageFactory {
  constructor(photographersList, mediaList) {
    this.photographersList = photographersList;
    this.mediaList = mediaList;
  }

  render(photographer, checkedTag) {
    if (!checkedTag) {
      window.scrollTo(0, 0);
    }

    const page = photographer
      ? new PhotographerPageBuilder(photographer, this.mediaList, checkedTag)
      : new HomePageBuilder(this.photographersList, checkedTag);

    page.render();
  }
}

export function addUpButtonEvent() {
  const upButton = document.getElementById("up-button");
  const mainContent = document.getElementById("main-content");

  window.addEventListener("scroll", () => {
    let mainRect = mainContent.getBoundingClientRect();

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
