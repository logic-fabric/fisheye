"use strict";

import { MediaList } from "../data/medium.js";
import { Button } from "./components/buttons.js";
import { MediumCard } from "./components/cards.js";
import { MediaFiltersDropdownMenu } from "./components/dropdown.js";
import { Logo } from "./components/logo.js";
import { MediaNavTag } from "./components/hashtags.js";

import { addUpButtonEvent } from "./pageFactory.js";

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

    const contentWrapper = document.getElementById("p-spa-wrapper");
    contentWrapper.className = "p-photographer";

    this.renderHeader();
    this.renderMain();

    console.log("-----");

    addUpButtonEvent();
    this.addLikesIncrementEvents();
    this.addSortWithDropdownMenu();
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
    htmlContent += "<div class=row-12 id='cards-container'>";
    htmlContent += this.templateMediaCards("date");
    htmlContent += "</div>";
    htmlContent += this.templatePhotographerSummary();

    main.innerHTML = htmlContent;
  }

  templatePhotographerBanner() {
    let htmlContent = "<section class='row-12 p-banner'>";

    htmlContent += `<div class="lg4 md4 sm4">
                      <h1>${this.photographer.name}</h1>
                      <p class="p-banner__location">
                        ${this.photographer.city}, ${this.photographer.country}
                      </p>
                      <p class="p-banner__tagline">
                        ${this.photographer.tagline}
                      </p>`;
    htmlContent += new MediaNavTag(this.photographer, this.checkedTag).html;
    htmlContent += "</div>";
    htmlContent += "<div class='lg4 md4 sm4'>";
    htmlContent += new Button("c-btn c-btn--cta", "button", "Contactez-moi")
      .html;
    htmlContent += "</div>";
    htmlContent += `<div class="lg4 md4 sm4 p-banner__portrait">
                      <img 
                        src="img/photographers/${this.photographer.portrait}" 
                        alt="${this.photographer.name}" width="200" height="200" 
                      />
                    </div>`;

    htmlContent += "</section>";

    return htmlContent;
  }

  templateMediaCards(filter) {
    let htmlContent = "";

    let photographerMedia = new MediaList(
      this.mediaList.filterByPhotographerIdAndTag(
        this.photographer.id,
        this.checkedTag
      )
    );
    if (filter == "date") photographerMedia.sortByDate();
    if (filter == "popularity") photographerMedia.sortByLikes();
    if (filter == "title") photographerMedia.sortByTitle();

    for (let medium of photographerMedia.media) {
      htmlContent += new MediumCard(this.photographer, medium).html;
    }

    return htmlContent;
  }

  templatePhotographerSummary() {
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
                        <span>${this.photographer.price}&nbsp;€&nbsp;/&nbsp;jour</span>
                      </aside>`;

    return htmlContent;
  }

  addUpButtonEvent() {
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

  addSortWithDropdownMenu() {
    const dropdownMenu = document.getElementById("sorting-dropdown");

    dropdownMenu.onchange = () => {
      const cardsContainer = document.getElementById("cards-container");

      cardsContainer.innerHTML = this.templateMediaCards(dropdownMenu.value);
    };
  }
}
