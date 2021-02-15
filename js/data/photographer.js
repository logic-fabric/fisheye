"use strict";

export class Photographer {
  constructor(id, name, city, country, tags, tagline, price, portrait) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tags = tags.sort();
    this.tagline = tagline;
    this.price = price;
    this.portrait = portrait;
  }

  /**
   * @returns {MediaList} All media made by the photographer
   */
  collectAllMedia() {} // TO DO: build as a property to use in sumAllMediaLikes

  /**
   * @returns {number} Sum of all likes given to the photographer's media
   */
  sumAllMediaLikes() {}
}

export class PhotographersList {
  constructor(photographers) {
    this.list = photographers;
  }

  /**
   * @returns {string[]} All tags present in this list of photographers
   */
  collectTags() {
    // TO DO: build as a property
    let tags = new Set();

    for (let photographer of this.list) {
      for (let tag of photographer.tags) {
        tag = tag.toLowerCase();
        tags.add(tag);
      }
    }
    return [...tags];
  }

  /**
   * @returns {string[]} All tags present, sorted by name
   */
  collectSortedTags() {
    const tags = this.collectTags();

    return tags.sort();
  }

  /**
   * @returns {PhotographersList} Photographers sorted by name
   */
  sortByName() {}

  /**
   * @param {string} tag
   * @returns {PhotographersList} All photographers possessing this tag
   */
  filterByTag(tag) {}
}
