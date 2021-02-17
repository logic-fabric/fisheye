"use strict";

import { Photographer, PhotographersList } from "../data/photographer.js";
import { Medium, MediaList } from "../data/medium.js";
import { PageBuilder } from "./pageBuilder.js";

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
    this.pageBuilder = new PageBuilder(this.PHOTOGRAPHERS, this.MEDIA);

    this.pageBuilder.renderHomePage("");
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
          `'Photographers' route for '${photographerName}' and tag '${tag}'`
        );

        this.pageBuilder.renderPage(photographerName, tag);
      } else {
        let tag = route;

        console.log(`Home route filtered on tag '${tag}'`);

        this.pageBuilder.renderPage("", tag);
      }
    };
  }
}
