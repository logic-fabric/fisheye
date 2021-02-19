"use strict";

export class Medium {
  constructor(id, photographerId, filename, tags, likes, date, price, altText) {
    this.id = id;
    this.photographerId = photographerId;
    this.filename = filename;
    this.tags = tags;
    this.likes = likes;
    this.date = date;
    this.price = price;
    this.altText = altText;
  }

  /**
   * @returns {string} Name based on the medium's filename
   */
  get title() {
    console.log(this.filename);
    const filenameWithoutExtension = this.filename.split(".")[0];
    console.log(filenameWithoutExtension);
    const title = filenameWithoutExtension.split("_").slice(1).join(" ");
    console.log(title);
    return title;
  }

  /** Add a like to the medium. */
  incrementLikes() {
    this.likes++;
  }
}

export class MediaList {
  constructor(media) {
    this.media = media;
  }

  /**
   * @returns {string[]} All tags present in this list of media
   */
  collectTags() {} // TO DO: build as a property

  /**
   * @returns {string[]} All tags present, sorted by name
   */
  collectSortedTags() {}

  /**
   * @returns {MediaList} Media sorted by date (starting with the most recent)
   */
  sortByDate() {}

  /**
   * @returns {MediaList} Media sorted by likes number (starting with the most popular)
   */
  sortByLikes() {}

  /**
   * @returns {MediaList} Media sorted by name
   */
  sortByName() {}

  filterByPhotographerIdAndTag(photographerId, tag) {
    let photographerMedia = [];

    if (tag) {
      for (let medium of this.media) {
        if (
          medium.photographerId === photographerId &&
          medium.tags.includes(tag)
        ) {
          photographerMedia.push(medium);
        }
      }
      return photographerMedia;
    }

    for (let medium of this.media) {
      if (medium.photographerId === photographerId) {
        photographerMedia.push(medium);
      }
    }
    return photographerMedia;
  }

  /**
   * @param {string} tag
   * @returns {MediaList} All media possessing this tag
   */
  filterByTag(tag) {}
}
