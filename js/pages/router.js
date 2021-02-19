"use strict";

import { Photographer, PhotographersList } from "../data/photographer.js";
import { Medium, MediaList } from "../data/medium.js";
import { PageFactory } from "./pageFactory.js";

export class Router {
  constructor(dataFetcher, initialRoute) {
    this.dataFetcher = dataFetcher;
    this.route = initialRoute;

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
      const fetchedMediumFilename = fetchedMedium.hasOwnProperty("image")
        ? fetchedMedium.image
        : fetchedMedium.video;

      const mediumInstance = new Medium(
        fetchedMedium.id,
        fetchedMedium.photographerId,
        fetchedMediumFilename,
        fetchedMedium.tags,
        fetchedMedium.likes,
        fetchedMedium.date,
        fetchedMedium.price,
        "TO DO: altText"
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

      console.log("Route >", route);

      if (route.startsWith("photographer")) {
        let routeParameters = route.split(":")[1];
        let [photographerName, tag] = routeParameters.split("#");

        console.log(
          `Photographer route for '${photographerName}' and tag '${tag}'`
        );

        let photographer = this.PHOTOGRAPHERS.findByName(photographerName);
        this.pageFactory.render(photographer, tag);
      } else {
        let tag = route;

        console.log(`Home route filtered on tag '${tag}'`);

        this.pageFactory.render("", tag);
      }
    };
  }
}
