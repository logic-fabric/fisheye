"use strict";

import { Button } from "./components/buttons.js";
import { MediaCard } from "./components/cards.js";
import { MediaFiltersDropdownMenu } from "./components/dropdown.js";
import { Logo } from "./components/logo.js";
import { MediaNavTag } from "./components/tags.js";

export class PhotographerPageBuilder {
  constructor(photographer, mediaList, checkedTag) {
    this.photographer = photographer;
    this.mediaList = mediaList;
    this.checkedTag = checkedTag;
  }

  render() {
    console.log(
      `Building PhotographerPage for '${this.photographer.name}' filtered by '${this.checkedTag}'...`
    );

    this.renderHeader();
    this.renderMain();

    console.log("-----");
  }

  renderHeader() {
    const header = document.querySelector("header");

    header.innerHTML = new Logo().html;
  }

  renderMain() {
    const main = document.querySelector("main");

    let htmlContent = "";
    htmlContent += this.templatePhotographerBanner(
      this.photographer,
      this.checkedTag
    );
    htmlContent += new MediaFiltersDropdownMenu().html;
    htmlContent += this.templateMediaCards(this.photographer, this.checkedTag);

    main.innerHTML = htmlContent;
  }

  templatePhotographerBanner() {
    let htmlContent = "<section>";

    htmlContent += `<h1>${this.photographer.name}</h1>`;
    htmlContent += `<p>
                      ${this.photographer.city}, ${this.photographer.country}
                    </p>`;
    htmlContent += `<p>${this.photographer.tagline}</p>`;
    htmlContent += new MediaNavTag(this.photographer, this.checkedTag).html;
    htmlContent += new Button("", "button", "Contactez-moi").html;
    htmlContent += `<img 
                      src="img/photographers/${this.photographer.portrait}" 
                      alt="${this.photographer.name}" width="200" height="200" 
                    />`;

    htmlContent += "</section>";

    return htmlContent;
  }

  templateMediaCards() {
    let htmlContent = "<div class=row-12>";

    const photographerMedia = this.mediaList.filterByPhotographerIdAndTag(
      this.photographer.id,
      this.checkedTag
    );

    for (let medium of photographerMedia) {
      htmlContent += new MediaCard(this.photographer, medium).html;
    }
    htmlContent += "</div>";

    return htmlContent;
  }
}
