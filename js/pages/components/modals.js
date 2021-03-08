"use strict";

class DisplayedImage {
  constructor(photographer, medium) {
    this._photographer = photographer;
    this._medium = medium;
  }

  get html() {
    return `<img 
        src="img/${this._photographer.mediaFolder}/${this._medium.filename}"
        alt="${this._medium.altText}" width="940" height="800"
            />`;
  }
}

class DisplayedVideo {
  constructor(photographer, medium) {
    this._photographer = photographer;
    this._medium = medium;
  }

  get html() {
    return `<video controls width="940">
              <source
        src="img/${this._photographer.mediaFolder}/${this._medium.filename}"
        type="video/mp4"
              />
            </video>`;
  }
}

class DisplayedMediumFactory {
  constructor(photographer, medium) {
    this._photographer = photographer;
    this._medium = medium;
  }

  get html() {
    if (this._medium.isVideo()) {
      return new DisplayedVideo(this._photographer, this._medium).html;
    } else {
      return new DisplayedImage(this._photographer, this._medium).html;
    }
  }
}

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

  get _displayedMediumIndex() {
    for (const medium of this._mediaList.media) {
      if (medium.id == this._displayedMediumId) {
        return this._mediaList.media.indexOf(medium);
      }
    }
    return null;
  }

  get html() {
    const displayedMediumHtml = new DisplayedMediumFactory(
      this._photographer,
      this._displayedMedium
    ).html;

    return `<div class="c-media-modal__carousel">
              <span class="icon-wrapper">
                <i class="fas fa-chevron-left"></i>
              </span>
              <div class="c-media-modal__medium" id="medium"">
                ${displayedMediumHtml}
              </div>
              <span class="icon-wrapper">
                <i class="fas fa-chevron-right"></i>
              </span>
            </div>
            <h2 id="medium-title">${this._displayedMedium.title}</h2>`;
  }

  addMouseNavigationEvents() {
    let currentMediumIndex = this._displayedMediumIndex;
    let mediaListLength = this._mediaList.media.length;

    const leftArrow = document.querySelector(".fa-chevron-left");
    const rightArrow = document.querySelector(".fa-chevron-right");
    const mediumContainer = document.getElementById("medium");
    const mediumTitle = document.getElementById("medium-title");

    leftArrow.onclick = () => {
      currentMediumIndex = (currentMediumIndex + 1) % mediaListLength;

      let mediumToDisplay = this._mediaList.media[currentMediumIndex];

      mediumContainer.innerHTML = new DisplayedMediumFactory(
        this._photographer,
        mediumToDisplay
      ).html;
      mediumTitle.textContent = mediumToDisplay.title;
    };

    rightArrow.onclick = () => {
      currentMediumIndex =
        (currentMediumIndex + mediaListLength - 1) % mediaListLength;

      let mediumToDisplay = this._mediaList.media[currentMediumIndex];

      mediumContainer.innerHTML = new DisplayedMediumFactory(
        this._photographer,
        mediumToDisplay
      ).html;
      mediumTitle.textContent = mediumToDisplay.title;
    };
  }
}
