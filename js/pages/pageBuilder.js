"use strict";

export class PageBuilder {
  constructor(photographers, media) {
    this.photographers = photographers;
    this.media = media;
  }

  buildHomePage(tag) {
    console.log(`Building HomePage filtered by tag '${tag}'...`);
    console.log("-----");
  }

  buildPhotographerPage(name, tag) {
    console.log(
      `Building PhotographerPage for '${name}' filtered by '${tag}'...`
    );
    console.log("-----");
  }
}
