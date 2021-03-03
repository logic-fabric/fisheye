"use strict";

import { LikesButton } from "./buttons.js";
import { PhotographersTagsNav } from "./hashtags.js";

class PhotographerCardFocusableArea {
  constructor(photographer) {
    this.photographer = photographer;
  }

  get html() {
    return `<a href="#photographer:${this.photographer.slug}">
              <img 
                src="img/photographers/${this.photographer.portrait}" 
                alt="${this.photographer.name}" width="200" height="200" 
              />
              <h2>${this.photographer.name}</h2>
            </a>`;
  }
}

class PhotographerCardInfos {
  constructor(photographer) {
    this.photographer = photographer;
  }

  get html() {
    return `<p class="c-photographer-card__location">
              ${this.photographer.city}, ${this.photographer.country}
            </p>
            <p class="c-photographer-card__tagline">
              ${this.photographer.tagline}
            </p>
            <p>${this.photographer.price}&nbsp;€/jour</p>`;
  }
}

export class PhotographerCard {
  constructor(photographer, checkedTag) {
    this.photographer = photographer;
    this.checkedTag = checkedTag;
  }

  get html() {
    return `<article class="c-photographer-card lg4 md4 sm4">
      ${new PhotographerCardFocusableArea(this.photographer).html}
      ${new PhotographerCardInfos(this.photographer).html}
      ${new PhotographersTagsNav(this.photographer.tags, this.checkedTag).html}
            </article>`;
  }
}

export class MediumCard {
  constructor(photographer, medium) {
    this.photographer = photographer;
    this.medium = medium;
  }

  get html() {
    let filename = this.medium.isVideo()
      ? this.medium.filename.replace("mp4", "png")
      : this.medium.filename;

    let htmlContent = `<article class="lg4 md4 sm4 c-medium-card">
                        <div class="c-medium-card__img" 
                         data-medium-id="${this.medium.id}">
                          <img
                            src="img/${this.photographer.mediaFolder}/${filename}" 
                            alt="${this.medium.altText}" 
                            width="350" height="300"
                          />`;
    if (this.medium.isVideo()) {
      htmlContent += "<i class='far fa-play-circle'></i>";
    }
    htmlContent += "</div>";
    htmlContent += `<div class="row-12 c-medium-card__infos">
                    <h2 class="lg7 md7 sm7">${this.medium.title}</h2>
                    <p class="lg2 md2 sm2">${this.medium.price}&nbsp;€</p>`;
    htmlContent += new LikesButton(
      "lg3 md3 sm3 c-btn",
      "button",
      this.medium.likes,
      this.medium.id
    ).html;
    htmlContent += "</div></article>";

    return htmlContent;
  }
}
