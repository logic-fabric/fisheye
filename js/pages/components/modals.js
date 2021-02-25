"use strict";

export class MediaModal {
  constructor(photographer, mediaList, displayedMediumId) {
    this.photographer = photographer;
    this.mediaList = mediaList;
    this.displayedMediumId = displayedMediumId;
  }

  get displayedMedium() {
    for (const medium of this.mediaList.media) {
      if (medium.id == this.displayedMediumId) return medium;
    }
    return null;
  }

  get html() {
    const medium = this.displayedMedium;

    return `<div class="c-media-modal__carousel">
              <span class="icon-wrapper">
                <i class="fas fa-chevron-left"></i>
              </span>
              <div class="c-media-modal__medium">
                <img
                  src="img/${this.photographer.mediaFolder}/${medium.filename}" 
                  alt="${medium.altText} for ${medium.filename}" 
                  width="940" height="800"
                />
              </div>
              <span class="icon-wrapper">
                <i class="fas fa-chevron-right"></i>
              </span>
            </div>
            <h2>${medium.title}</h2>`;
  }
}
