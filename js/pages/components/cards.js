"use strict";

import { LikesButton } from "./buttons.js";
import { PhotographersTagsNav } from "./tagsNav.js";

class PhotographerCardFocusableArea {
  constructor(photographer) {
    this._photographer = photographer;
  }

  get html() {
    return `<a href="#photographer:${this._photographer.slug}#all">
              <img 
                src="img/photographers/${this._photographer.portrait}" 
                alt="${this._photographer.name}" width="200" height="200" 
              />
              <h2>${this._photographer.name}</h2>
            </a>`;
  }
}

class PhotographerCardInfos {
  constructor(photographer) {
    this._photographer = photographer;
  }

  get html() {
    return `<p class="c-photographer-card__location">
              ${this._photographer.city}, ${this._photographer.country}
            </p>
            <p class="c-photographer-card__tagline">
              ${this._photographer.tagline}
            </p>
            <p>${this._photographer.price}&nbsp;€/jour</p>`;
  }
}

export class PhotographerCard {
  constructor(photographer, checkedTag) {
    this._photographer = photographer;
    this._checkedTag = checkedTag;
  }

  get html() {
    return `<article class="c-photographer-card lg4 md4 sm4">
  ${new PhotographerCardFocusableArea(this._photographer).html}
  ${new PhotographerCardInfos(this._photographer).html}
  ${new PhotographersTagsNav(this._photographer.tags, this._checkedTag).html}
            </article>`;
  }
}

export class MediumCard {
  constructor(photographer, medium) {
    this._photographer = photographer;
    this._medium = medium;
  }

  get html() {
    let filename = this._medium.isVideo()
      ? this._medium.filename.replace("mp4", "png")
      : this._medium.filename;

    let htmlContent = `<article class="lg4 md4 sm4 c-medium-card">
                        <div class="c-medium-card__img" 
                         data-medium-id="${this._medium.id}">
                          <img
                            src="img/${this._photographer.mediaFolder}/${filename}" 
                            alt="${this._medium.altText}" 
                            width="350" height="300"
                          />`;
    if (this._medium.isVideo()) {
      htmlContent += "<i class='far fa-play-circle'></i>";
    }
    htmlContent += "</div>";
    htmlContent += `<div class="row-12 c-medium-card__infos">
                    <h2 class="lg7 md7 sm7">${this._medium.title}</h2>
                    <p class="lg2 md2 sm2">${this._medium.price}&nbsp;€</p>`;
    htmlContent += new LikesButton(
      "lg3 md3 sm3 c-btn",
      "button",
      this._medium.likes,
      this._medium.id
    ).html;
    htmlContent += "</div></article>";

    return htmlContent;
  }
}
