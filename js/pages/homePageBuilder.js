"use strict";

import { PhotographerCard } from "./components/cards.js";
import { Logo } from "./components/logo.js";
import { PhotographersNavTag } from "./components/hashtags.js";

export class HomePageBuilder {
  constructor(photographersList, checkedTag) {
    this.photographersList = photographersList;
    this.checkedTag = checkedTag;

    this.photographersTags = photographersList.sortedTags;
  }

  render() {
    console.log(`Building HomePage filtered by tag '${this.checkedTag}'...`);

    const contentWrapper = document.getElementById("p-spa-wrapper");
    contentWrapper.className = "p-home";

    this.renderHeader();
    this.renderMain();

    console.log("-----");
  }

  renderHeader() {
    const header = document.querySelector("header");
    let htmlContent = "";

    htmlContent += new Logo().html;
    htmlContent += new PhotographersNavTag(
      this.photographersTags,
      this.checkedTag
    ).html;
    htmlContent += "<a class='c-btn c-btn--up' href= '#'>Revenir en haut</a>";

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

    for (let photographer of this.photographersList.filterByTag(
      this.checkedTag
    )) {
      htmlContent += new PhotographerCard(photographer, this.checkedTag).html;
    }
    htmlContent += "</div>";

    return htmlContent;
  }
}
