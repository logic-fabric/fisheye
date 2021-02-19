"use strict";

import { Button } from "./components/buttons.js";
import { MediaCard, PhotographerCard } from "./components/cards.js";
import { MediaFiltersDropdownMenu } from "./components/dropdown.js";
import { Logo } from "./components/logo.js";
import { MediaNavTag, PhotographersNavTag } from "./components/tags.js";

export class PageBuilder {
  constructor(photographersList, mediaList) {
    this.photographersList = photographersList;
    this.photographersTags = photographersList.collectSortedTags();

    this.mediaList = mediaList;
  }

  renderPage(photographer, tag) {
    if (photographer) {
      this.renderPhotographerPage(photographer, tag);
    } else {
      this.renderHomePage(tag);
    }
  }

  renderHomePage(tag) {
    console.log(`Building HomePage filtered by tag '${tag}'...`);

    this.renderHomePageHeader(tag);
    this.renderHomePageMain(tag);

    console.log("-----");
  }

  renderHomePageHeader(checkedTag) {
    const header = document.querySelector("header");
    let htmlContent = "";

    htmlContent += new Logo().html;
    htmlContent += new Button("", "button", "Revenir en haut").html;
    htmlContent += new PhotographersNavTag(this.photographersTags, checkedTag)
      .html;

    header.innerHTML = htmlContent;
  }

  renderHomePageMain(tag) {
    const main = document.querySelector("main");
    let htmlContent = "<h1>Nos photographes</h1>";

    htmlContent += this.templatePhotographersCards(tag);

    main.innerHTML = htmlContent;
  }

  renderPhotographerPage(photographer, tag) {
    console.log(
      `Building PhotographerPage for '${photographer.name}' filtered by '${tag}'...`
    );

    this.renderPhotographerPageHeader(tag);
    this.renderPhotographerPageMain(photographer, tag);

    console.log("-----");
  }

  renderPhotographerPageHeader() {
    const header = document.querySelector("header");

    header.innerHTML = new Logo().html;
  }

  renderPhotographerPageMain(photographer, checkedTag) {
    const main = document.querySelector("main");

    let htmlContent = "";
    htmlContent += this.templatePhotographerBanner(photographer, checkedTag);
    htmlContent += new MediaFiltersDropdownMenu().html;
    htmlContent += this.templateMediaCards(photographer, checkedTag);

    main.innerHTML = htmlContent;
  }

  templatePhotographersCards(tag) {
    let htmlContent = "<div class=row-12>";

    for (let photographer of this.photographersList.filterByTag(tag)) {
      htmlContent += new PhotographerCard(photographer).html;
    }
    htmlContent += "</div>";

    return htmlContent;
  }

  templatePhotographerBanner(photographer, checkedTag) {
    let htmlContent = "<section>";

    htmlContent += `<h1>${photographer.name}</h1>`;
    htmlContent += `<p>${photographer.city}, ${photographer.country}</p>`;
    htmlContent += `<p>${photographer.tagline}</p>`;
    htmlContent += new MediaNavTag(photographer, checkedTag).html;
    htmlContent += new Button("", "button", "Contactez-moi").html;
    htmlContent += `<img 
                      src="img/photographers/${photographer.portrait}" 
                      alt="${photographer.name}" width="200" height="200" 
                    />`;

    htmlContent += "</section>";

    return htmlContent;
  }

  templateMediaCards(photographer, checkedTag) {
    let htmlContent = "<div class=row-12>";

    const photographerMedia = this.mediaList.filterByPhotographerIdAndTag(
      photographer.id,
      checkedTag
    );

    for (let medium of photographerMedia) {
      htmlContent += new MediaCard(photographer, medium).html;
    }
    htmlContent += "</div>";

    return htmlContent;
  }
}
