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

  get title() {
    const filenameWithoutExtension = this.filename.split(".")[0];
    const rawTitle = filenameWithoutExtension.split("_").slice(1).join(" ");

    return rawTitle[0].toUpperCase() + rawTitle.slice(1).toLowerCase();
  }

  isVideo() {
    return this.filename.toLowerCase().endsWith("mp4");
  }
}

export class MediaList {
  constructor(media) {
    this.media = media;
  }

  sortByDate() {
    return this.media.sort((m1, m2) => {
      if (m1.date - m2.date < 0) return 1;
      if (m1.date - m2.date > 0) return -1;
      return 0;
    });
  }

  sortByLikes() {
    return this.media.sort((m1, m2) => {
      if (m1.likes < m2.likes) return 1;
      if (m1.likes > m2.likes) return -1;
      return 0;
    });
  }

  sortByTitle() {
    return this.media.sort((m1, m2) => {
      const title1 = m1.title.toLowerCase();
      const title2 = m2.title.toLowerCase();

      if (title1 > title2) return 1;
      if (title1 < title2) return -1;
      return 0;
    });
  }

  filterByTagAndPhotographerId(tag, photographerId) {
    let photographerMedia = [];

    if (tag !== "all") {
      for (let medium of this.media) {
        if (
          medium.photographerId === photographerId &&
          medium.tags.includes(tag)
        ) {
          photographerMedia.push(medium);
        }
      }
      return new MediaList(photographerMedia);
    }

    for (let medium of this.media) {
      if (medium.photographerId === photographerId) {
        photographerMedia.push(medium);
      }
    }
    return new MediaList(photographerMedia);
  }
}
