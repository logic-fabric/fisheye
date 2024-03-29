"use strict";

import { PhotographerCard } from "./components/cards.js";
import { Logo } from "./components/logo.js";
import { PhotographersTagsNav } from "./components/tagsNav.js";

export class HomePageBuilder {
  /**
   * @constructs
   * @param {PhotographersList} photographersList
   * @param {string} checkedTag
   */
  constructor(photographersList, checkedTag) {
    this._photographersList = photographersList.filterByTag(checkedTag);
    this._checkedTag = checkedTag;

    this._photographersTags = [...photographersList.sortedTags];
    this._photographersTags.push("tous");
  }

  render() {
    const contentWrapper = document.getElementById("p-spa-wrapper");

    contentWrapper.className = "p-home";

    this._renderHeader();
    this._renderMain();

    this._decoratePhotographersCardsBackgrounds();
  }

  _renderHeader() {
    const header = document.querySelector("header");
    let htmlContent = "";

    htmlContent += new Logo().html;
    htmlContent += new PhotographersTagsNav(
      this._photographersTags,
      this._checkedTag
    ).html;

    header.innerHTML = htmlContent;
  }

  _renderMain() {
    const main = document.querySelector("main");
    let htmlContent = "<h1>Nos photographes</h1>";

    htmlContent += this._templatePhotographersCards(this._checkedTag);

    main.innerHTML = htmlContent;
  }

  _templatePhotographersCards() {
    let cardsHtml = "";

    for (let photographer of this._photographersList.photographers) {
      cardsHtml += new PhotographerCard(photographer, this._checkedTag).html;
    }

    return `<div class="row-12 has-gutter-xl">${cardsHtml}</div>`;
  }

  _decoratePhotographersCardsBackgrounds() {
    for (let photographer of this._photographersList.photographers) {
      const cardDecorativeBackground = document.getElementById(
        `${photographer.slug}-decorative-bg`
      );

      cardDecorativeBackground.style.background = photographer.decorativeColor;
    }
  }
}
