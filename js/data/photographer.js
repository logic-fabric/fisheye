"use strict";

import { sortAlphabetically } from "../utilities/sort.js";

export class Photographer {
  /**
   * @constructs
   * @param {number} id
   * @param {string} name
   * @param {string} city
   * @param {string} country
   * @param {Array.string} tags
   * @param {string} tagline
   * @param {number} price
   * @param {string} portrait
   * @param {string} decorativeColor
   */
  constructor(
    id,
    name,
    city,
    country,
    tags,
    tagline,
    price,
    portrait,
    decorativeColor
  ) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tags = tags.sort();
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
    this.decorativeColor = decorativeColor;
  }

  /**
   * Add a 'mediaFolder' attribute giving the folder where the media of this photographer are stocked.
   * @returns {string}
   */
  get mediaFolder() {
    return this.name.replace(/ /, "").replace(/-/, "");
  }

  /**
   * Add a 'slug' version of the photographer name, to use with the Router.
   * @returns {string}
   */
  get slug() {
    return this.name.toLowerCase().replace(/ /, "-");
  }
}

export class PhotographersList {
  /**
   * @constructs
   * @param {Array.Photographer} photographers
   */
  constructor(photographers) {
    this.photographers = photographers;

    this.sortByName();
  }

  findByName(name) {
    const slugToMatch = name.toLowerCase().replace(/ /, "-");

    for (let photographer of this.photographers) {
      if (photographer.slug === slugToMatch) {
        return photographer;
      }
    }
    return `No photographer finded for the name '${name}'`;
  }

  _collectTags() {
    let tags = new Set();

    for (let photographer of this.photographers) {
      for (let tag of photographer.tags) {
        tag = tag.toLowerCase();
        tags.add(tag);
      }
    }
    return [...tags];
  }

  /**
   * Add a 'sortedTags' attribute build by collecting and sorting alphabetically all the tags of the photographers in the list.
   * @returns  {Array.string}
   */
  get sortedTags() {
    const tags = this._collectTags();

    return sortAlphabetically(tags);
  }

  sortByName() {
    this.photographers.sort((p1, p2) => {
      const name1 = p1.name.toLowerCase();
      const name2 = p2.name.toLowerCase();

      if (name1 > name2) return 1;
      if (name1 < name2) return -1;
      return 0;
    });
  }

  /**
   * @param {string} tagToMatch
   * @returns {PhotographersList}
   */
  filterByTag(tagToMatch) {
    if (tagToMatch === "tous") return this;

    const filteredPhotographers = this.photographers.filter((photographer) =>
      photographer.tags.includes(tagToMatch)
    );

    return new PhotographersList(filteredPhotographers);
  }
}
