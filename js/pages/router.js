"use strict";

import { Photographer, PhotographersList } from "../data/photographer.js";
import { Medium, MediaList } from "../data/medium.js";

export class Router {
  constructor(dataFetcher, initialRoute) {
    this.dataFetcher = dataFetcher;
    this.route = initialRoute;

    this.initializeData();
  }

  async initializeData() {
    this.data = await this.dataFetcher.fetchSource();

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
      const mediumInstance = new Medium(
        fetchedMedium.id,
        fetchedMedium.photographerId,
        fetchedMedium.filename,
        fetchedMedium.tags,
        fetchedMedium.likes,
        fetchedMedium.date,
        fetchedMedium.price,
        "TO DO: add an altText into JSON"
      );

      mediumInstances.push(mediumInstance);
    }

    this.PHOTOGRAPHERS = new PhotographersList(photographerInstances);
    this.MEDIA = new MediaList(mediumInstances);
  }
}
