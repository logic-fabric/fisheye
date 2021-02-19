"use strict";

import { PhotographersNavTag } from "./tags.js";

export class MediaCard {
  constructor(photographer, medium) {
    this.photographer = photographer;
    this.medium = medium;
  }

  get html() {
    let htmlContent = "<article class='lg4 md4 sm4'>";
    htmlContent += `<a 
      href="#photographer:${this.photographer.name.replace(/ /, "-")}">`;

    const filename = this.medium.filename.endsWith("mp4")
      ? this.medium.filename.replace("mp4", "png")
      : this.medium.filename;

    htmlContent += `<img 
                      src="img/${this.photographer.mediaFolder}/${filename}" 
                      alt="${this.medium.altText} for ${filename}" 
                      width="200" height="200"
                    />`;
    htmlContent += "</a>";
    htmlContent += `<h2>${this.medium.filename}</h2>`;
    htmlContent += `<p>${this.medium.price}&nbsp;€</p>`;
    htmlContent += `<p>
                      ${this.medium.likes}&nbsp;
                      <i class="fas fa-heart"></i>
                    </p>`;
    htmlContent += "</article>";

    return htmlContent;
  }
}

class PhotographerCardFocusableArea {
  constructor(photographer) {
    this.photographer = photographer;
  }

  get html() {
    return `<a href="#photographer:${this.photographer.name.replace(/ /, "-")}">
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
    return `<p>${this.photographer.city}, ${this.photographer.country}</p>
            <p>${this.photographer.tagline}</p>
            <p>${this.photographer.price}&nbsp;€/jour</p>`;
  }
}

export class PhotographerCard {
  constructor(photographer) {
    this.photographer = photographer;
  }

  get html() {
    let htmlContent = "<article class='lg4 md4 sm4'>";

    htmlContent += new PhotographerCardFocusableArea(this.photographer).html;
    htmlContent += new PhotographerCardInfos(this.photographer).html;
    htmlContent += new PhotographersNavTag(this.photographer.tags, "").html;

    htmlContent += "</article>";

    return htmlContent;
  }
}
