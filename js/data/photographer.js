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
   * @returns {number} Sum of all likes given to the photographer's media
   */
  sumAllMediaLikes() {}
}

export class PhotographersList {
  constructor(photographers) {
    this.photographers = photographers;
    this.sortByName();
  }

  findByName(name) {
    name = name.replace(/ /, "-");
    for (let photographer of this.photographers) {
      if (photographer.name.replace(/ /, "-") === name) {
        return photographer;
      }
    }
    return `No photographer finded for the name '${name}'`;
  }

  /**
   * @returns {string[]} All tags present in this list of photographers
   */
  collectTags() {
    // TO DO: build as a property
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
   * @returns {string[]} All tags present, sorted by name
   */
  collectSortedTags() {
    const tags = this.collectTags();

    return tags.sort();
  }

  /**
   * @returns {PhotographersList} Photographers sorted by name
   */
  sortByName() {
    return this.photographers.sort((p1, p2) => {
      const name1 = p1.name.toLowerCase();
      const name2 = p2.name.toLowerCase();

      if (name1 > name2) return 1;
      if (name1 < name2) return -1;
      return 0;
    });
  }

  /**
   * @param {string} tag
   * @returns {PhotographersList} All photographers possessing this tag
   */
  filterByTag(tagToMatch) {
    if (tagToMatch === "") {
      return [...this.photographers];
    }

    let filteredPhotographers = [];

    for (let photographer of this.photographers) {
      for (let tag of photographer.tags) {
        if (tag === tagToMatch) {
          filteredPhotographers.push(photographer);
          break;
        }
      }
    }
    return filteredPhotographers;
  }
}
