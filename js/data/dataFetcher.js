"use strict";

import { Photographer, PhotographersList } from "./photographer.js";
import { Medium, MediaList } from "./medium.js";

export class DataFetcher {
  /**
   * @constructs
   * @param {string} dataSource
   */
  constructor(dataSource) {
    this._dataSource = dataSource;
  }

  /**
   * Fetch the data source and return its content as a PhotographersList and a MediaList if the fetching is ok.
   * @returns {PhotographersList, MediaList}
   */
  async fetchSource() {
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
          "image" in fetchedMedium ? fetchedMedium.image : fetchedMedium.video;

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
  }
}
