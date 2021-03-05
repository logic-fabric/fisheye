"use strict";

class Modal {
  constructor() {
    this._addCloseModalEvents();
  }

  _addCloseModalEvents() {
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

export class MediaModal extends Modal {
  constructor(photographer, mediaList, displayedMediumId) {
    super();

    this._photographer = photographer;
    this._mediaList = mediaList;
    this._displayedMediumId = displayedMediumId;
  }

  get _displayedMedium() {
    for (const medium of this._mediaList.media) {
      if (medium.id == this._displayedMediumId) return medium;
    }
    return null;
  }

  get html() {
    const medium = this._displayedMedium;

    return `<div class="c-media-modal__carousel">
              <span class="icon-wrapper">
                <i class="fas fa-chevron-left"></i>
              </span>
              <div class="c-media-modal__medium">
                <img
                  src="img/${this._photographer.mediaFolder}/${medium.filename}" 
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
