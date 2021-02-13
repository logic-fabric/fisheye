"use strict";

class Photographer {
  constructor(id, name, city, country, tags, tagline, price, portrait) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.country = country;
    this.tags = tags;
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

class PhotographersList {
  constructor(photographers) {
    this.photographers = photographers;
  }

  /**
   * @returns {string[]} All tags present in this list of photographers
   */
  collectTags() {} // TO DO: build as a property

  /**
   * @returns {string[]} All tags present, sorted by name
   */
  collectSortedTags() {}

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
