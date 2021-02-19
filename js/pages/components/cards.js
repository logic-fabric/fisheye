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

    if (this.medium.filename.toLowerCase().endsWith(".jpg")) {
      htmlContent += `<img 
                        src="img/${this.photographer.mediaFolder}/${this.medium.filename}" 
                        alt="${this.medium.altText} for ${this.medium.filename}" 
                        width="200" height="200"
                      />`;
    } else {
      htmlContent += `<video width="200", height="200" controls>
                        <source 
                          src="img/${this.photographer.mediaFolder}/${this.medium.filename}" 
                          type="video/mp4"
                        />
                      </video>`;
    }
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
