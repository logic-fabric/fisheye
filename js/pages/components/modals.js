"use strict";

export class MediaModal {
  constructor(photographer, mediaList, displayedMediumId) {
    this.photographer = photographer;
    this.mediaList = mediaList;
    this.displayedMediumId = displayedMediumId;

    this.addCloseModalEvents();
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

  addCloseModalEvents() {
    const modalBackground = document.getElementById("modal-bg");
    const modalWindow = document.getElementById("modal-window");
    const modalContent = document.getElementById("modal-content");
    const closeIcon = document.getElementById("close-icon");

    closeIcon.onclick = () => {
      modalBackground.classList.remove("displayed");
      modalContent.innerHTML = "";
    };

    modalWindow.onclick = (e) => e.stopPropagation();
    modalBackground.onclick = () => {
      modalBackground.classList.remove("displayed");
      modalContent.innerHTML = "";
    };
  }
}
