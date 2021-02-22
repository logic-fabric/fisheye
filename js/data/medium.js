"use strict";

export class Medium {
  constructor(id, photographerId, filename, tags, likes, date, price, altText) {
    this.id = id;
    this.photographerId = photographerId;
    this.filename = filename;
    this.tags = tags;
    this.likes = likes;
    this.date = new Date(date);
    this.price = price;
    this.altText = altText;
  }

  /**
   * @returns {string} Name based on the medium's filename
   */
  get title() {
    const filenameWithoutExtension = this.filename.split(".")[0];
    let title = filenameWithoutExtension.split("_").slice(1).join(" ");
    title = title.toLowerCase();
    title = title[0].toUpperCase() + title.slice(1);
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
   * @returns {MediaList} Media sorted by date from newest to oldest
   */
  sortByDate() {
    return this.media.sort((m1, m2) => {
      if (m1.date - m2.date < 0) return 1;
      if (m1.date - m2.date > 0) return -1;
      return 0;
    });
  }

  /**
   * @returns {MediaList} Media sorted by likes from the most popular to the less popular
   */
  sortByLikes() {
    return this.media.sort((m1, m2) => {
      if (m1.likes < m2.likes) return 1;
      if (m1.likes > m2.likes) return -1;
      return 0;
    });
  }

  /**
   * @returns {MediaList} Media sorted by title
   */
  sortByTitle() {
    return this.media.sort((m1, m2) => {
      const title1 = m1.title.toLowerCase();
      const title2 = m2.title.toLowerCase();

      if (title1 > title2) return 1;
      if (title1 < title2) return -1;
      return 0;
    });
  }

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
