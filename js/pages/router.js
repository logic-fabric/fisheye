"use strict";

import { Photographer, PhotographersList } from "../data/photographer.js";
import { Medium, MediaList } from "../data/medium.js";
import { PageFactory } from "./pageFactory.js";

export class Router {
  constructor(dataFetcher) {
    this.dataFetcher = dataFetcher;

    this.init();
  }

  async init() {
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
    this.addRouteListener();
  }

  addRouteListener() {
    window.onhashchange = () => {
      const route = window.location.hash.slice(1);
      let photographer, tag;

      if (route.startsWith("photographer")) {
        const routeData = route.split(":")[1];
        const routeParameters = routeData.split("#");
        const photographerName = routeParameters[0];
        
        photographer = this.PHOTOGRAPHERS.findByName(photographerName);
        tag = routeParameters[1];
      } else {
        photographer = "";
        tag = route;
      }

      this.pageFactory.render(photographer, tag);
    };
  }
}
