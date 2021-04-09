"use strict";

export class Medium {
  /**
   * @constructs
   * @param {number} id
   * @param {string} photographerId
   * @param {string} filename
   * @param {Array.string} tags
   * @param {number} likes
   * @param {string} date
   * @param {number} price
   * @param {string} altText
   */
  constructor(id, photographerId, filename, tags, likes, date, price, altText) {
    this.id = id;
    this.photographerId = photographerId;
    this.filename = filename;
    this.tags = tags;
    this.likes = likes;
    this.isLiked = false;
    this.date = new Date(date);
    this.price = price;
    this.altText = altText;
  }

  /**
   * Add a 'title' attribute based on the medium filename.
   * @returns {string}
   */
  get title() {
    const filenameWithoutExtension = this.filename.split(".")[0];
    const rawTitle = filenameWithoutExtension.split("_").slice(1).join(" ");

    return rawTitle[0].toUpperCase() + rawTitle.slice(1).toLowerCase();
  }

  /**
   * @returns {boolean}
   */
  isVideo() {
    return this.filename.toLowerCase().endsWith("mp4");
  }
}

export class MediaList {
  /**
   * @constructs
   * @param {Array.Medium} media
   */
  constructor(media) {
    this.media = media;
  }

  /**
   * @param {string} tag
   * @param {number} photographerId
   * @returns {MediaList}
   */
  filterByTagAndPhotographerId(tag, photographerId) {
    let photographerMedia;

    if (tag === "tous") {
      photographerMedia = this.media.filter(
        (medium) => medium.photographerId === photographerId
      );
    } else {
      photographerMedia = this.media.filter(
        (medium) =>
          medium.photographerId === photographerId && medium.tags.includes(tag)
      );
    }

    return new MediaList(photographerMedia);
  }

  _sortByDate() {
    return this.media.sort((m1, m2) => {
      if (m1.date - m2.date < 0) return 1;
      if (m1.date - m2.date > 0) return -1;
      return 0;
    });
  }

  _sortByLikes() {
    return this.media.sort((m1, m2) => {
      if (m1.likes < m2.likes) return 1;
      if (m1.likes > m2.likes) return -1;
      return 0;
    });
  }

  _sortByTitle() {
    return this.media.sort((m1, m2) => {
      const title1 = m1.title.toLowerCase();
      const title2 = m2.title.toLowerCase();

      if (title1 > title2) return 1;
      if (title1 < title2) return -1;
      return 0;
    });
  }

  /**
   * @param {string} criterion
   */
  sortByCriterion(criterion) {
    if (criterion == "date") this._sortByDate();
    if (criterion == "likes") this._sortByLikes();
    if (criterion == "title") this._sortByTitle();
  }
}
