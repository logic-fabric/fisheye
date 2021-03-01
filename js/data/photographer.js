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

  get mediaFolder() {
    return this.name.replace(/ /, "").replace(/-/, "");
  }

  get slug() {
    return this.name.toLowerCase().replace(/ /, "-");
  }
}

export class PhotographersList {
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

  get sortedTags() {
    const tags = this._collectTags();

    return tags.sort();
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

  filterByTag(tagToMatch) {
    if (tagToMatch === "") return this;

    let filteredPhotographers = [];

    for (let photographer of this.photographers) {
      if (photographer.tags.includes(tagToMatch)) {
        filteredPhotographers.push(photographer);
      }
    }
    return new PhotographersList(filteredPhotographers);
  }
}
