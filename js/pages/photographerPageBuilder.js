"use strict";

import { MediaList } from "../data/medium.js";
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

    this.addLikesIncrementEvents();
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
    htmlContent += this.templatePhotographerSummary(this.photographer);

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

    let photographerMedia = new MediaList(
      this.mediaList.filterByPhotographerIdAndTag(
        this.photographer.id,
        this.checkedTag
      )
    );
    photographerMedia.sortByDate();

    for (let medium of photographerMedia.media) {
      htmlContent += new MediaCard(this.photographer, medium).html;
    }
    htmlContent += "</div>";

    return htmlContent;
  }

  templatePhotographerSummary(photographer) {
    let photographerTotalLikes = 0;
    const photographerMedia = this.mediaList.filterByPhotographerIdAndTag(
      this.photographer.id,
      ""
    );

    for (let medium of photographerMedia) {
      photographerTotalLikes += medium.likes;
    }

    let htmlContent = `<aside>
                        <span id="photographer-total-likes">
                          ${photographerTotalLikes}
                        </span>
                        &nbsp;<i class="fas fa-heart"></i>
                        <span>${photographer.price}&nbsp;€&nbsp;/&nbsp;jour</span>
                      </aside>`;

    return htmlContent;
  }

  addLikesIncrementEvents() {
    const photographerMedia = this.mediaList.filterByPhotographerIdAndTag(
      this.photographer.id,
      this.checkedTag
    );

    for (let medium of photographerMedia) {
      const likesButton = document.querySelector(
        `[data-medium-id="${medium.id}"]`
      );
      const likesQuantitySpan = document.getElementById(
        `likes-quantity-${medium.id}`
      );
      const photographerTotalLikesSpan = document.getElementById(
        "photographer-total-likes"
      );
      let totalLikes = photographerTotalLikesSpan.textContent;

      likesButton.onclick = () => {
        medium.likes++;
        totalLikes++;

        likesQuantitySpan.textContent = medium.likes;
        photographerTotalLikesSpan.textContent = totalLikes;
      };
    }
  }
}
