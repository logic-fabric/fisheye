"use strict";

import { Button } from "./components/buttons.js";
import { PhotographerCard } from "./components/cards.js";
import { Logo } from "./components/logo.js";
import { PhotographersNavTag } from "./components/tags.js";

export class HomePageBuilder {
  constructor(photographersList, checkedTag) {
    this.photographersList = photographersList;
    this.checkedTag = checkedTag;

    this.photographersTags = photographersList.collectSortedTags();
  }

  render() {
    console.log(`Building HomePage filtered by tag '${this.checkedTag}'...`);

    this.renderHeader();
    this.renderMain();

    console.log("-----");
  }

  renderHeader() {
    const header = document.querySelector("header");
    let htmlContent = "";

    htmlContent += new Logo().html;
    htmlContent += new Button("", "button", "Revenir en haut").html;
    htmlContent += new PhotographersNavTag(
      this.photographersTags,
      this.checkedTag
    ).html;

    header.innerHTML = htmlContent;
  }

  renderMain() {
    const main = document.querySelector("main");
    let htmlContent = "<h1>Nos photographes</h1>";

    htmlContent += this.templatePhotographersCards(this.checkedTag);

    main.innerHTML = htmlContent;
  }

  templatePhotographersCards() {
    let htmlContent = "<div class=row-12>";

    for (let photographer of this.photographersList.filterByTag(this.checkedTag)) {
      htmlContent += new PhotographerCard(photographer).html;
    }
    htmlContent += "</div>";

    return htmlContent;
  }
}
