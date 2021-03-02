"use strict";

import { DataFetcher } from "./data/dataFetcher.js";
import { Photographer, PhotographersList } from "./data/photographer.js";
import { Medium, MediaList } from "./data/medium.js";
import { PageFactory } from "./pages/pageFactory.js";
import { Router } from "./pages/router.js";

export class SinglePageApplication {
  constructor(dataSource) {
    this._dataFetcher = new DataFetcher(dataSource);

    this._init();
  }

  async _init() {
    this.data = await this._dataFetcher.fetchSource();

    const photographerInstances = [];
    const mediumInstances = [];

    for (let fetchedPhotographer of this.data.photographers) {
      const photographerInstance = new Photographer(
        fetchedPhotographer.id,
        fetchedPhotographer.name,
        fetchedPhotographer.city,
        fetchedPhotographer.country,
        fetchedPhotographer.tags,
        fetchedPhotographer.tagline,
        fetchedPhotographer.price,
        fetchedPhotographer.portrait
      );

      photographerInstances.push(photographerInstance);
    }

    for (let fetchedMedium of this.data.media) {
      const fetchedMediumFilename =
        "image" in fetchedMedium ? fetchedMedium.image : fetchedMedium.video;

      const mediumInstance = new Medium(
        fetchedMedium.id,
        fetchedMedium.photographerId,
        fetchedMediumFilename,
        fetchedMedium.tags,
        fetchedMedium.likes,
        fetchedMedium.date,
        fetchedMedium.price,
        fetchedMedium.altText,
      );

      mediumInstances.push(mediumInstance);
    }

    this.PHOTOGRAPHERS = new PhotographersList(photographerInstances);
    this.MEDIA = new MediaList(mediumInstances);

    this.pageFactory = new PageFactory(this.PHOTOGRAPHERS, this.MEDIA);
    this.pageFactory.render("", "");

    this._router = new Router(this.pageFactory, this.PHOTOGRAPHERS);

    this._router.addRouteListener();
  }
}
