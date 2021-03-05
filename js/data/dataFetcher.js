"use strict";

import { Photographer, PhotographersList } from "./photographer.js";
import { Medium, MediaList } from "./medium.js";

export class DataFetcher {
  constructor(dataSource) {
    this._dataSource = dataSource;
  }

  async fetchSource() {
    try {
      let response = await fetch(this._dataSource);

      if (response.ok) {
        let data = await response.json();

        const photographerInstances = [];
        const mediumInstances = [];

        for (let fetchedPhotographer of data.photographers) {
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

        for (let fetchedMedium of data.media) {
          const fetchedMediumFilename =
            "image" in fetchedMedium
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
            fetchedMedium.altText
          );

          mediumInstances.push(mediumInstance);
        }

        return {
          photographers: new PhotographersList(photographerInstances),
          media: new MediaList(mediumInstances),
        };
      } else {
        console.error(
          `HTTP-error-${response.status} while fetchning ${this._dataSource}`
        );
      }
    } catch (err) {
      console.error(
        `An error occured while fecthing ${this._dataSource} : ${err}`
      );
    }
  }
}
