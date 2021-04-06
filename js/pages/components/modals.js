"use strict";

import { Button } from "./buttons.js";

class Modal {
  addCloseModalEvents() {
    const modalBackground = document.getElementById("modal-bg");
    const modalWindow = document.getElementById("modal-window");
    const closeIcon = document.getElementById("close-icon");

    closeIcon.onclick = () => {
      modalBackground.classList.remove("displayed");
      modalWindow.innerHTML = "";
    };

    modalWindow.onclick = (e) => e.stopPropagation();

    modalBackground.onclick = () => {
      modalBackground.classList.remove("displayed");
      modalWindow.innerHTML = "";
    };

    document.onkeydown = (key) => {
      if (key.code === "Escape") {
        modalBackground.classList.remove("displayed");
        modalWindow.innerHTML = "";
      }
    };
  }
}

export class ContactModal extends Modal {
  /**
   * @constructs
   * @param {Photographer} photographer 
   */
  constructor(photographer) {
    super();

    this._photographer = photographer;
  }

  get html() {
    let submitButtonHtml = new Button("c-btn c-btn--cta", "submit", "Envoyer")
      .html;

    return `<i class="fas fa-times" id="close-icon"></i>
            <div id="contact-form-wrapper">
              <h1>
                Contactez-moi<br />
                ${this._photographer.name}
              </h1>
              <form id="contact-form" action="index.html" method=post"">
                <label for="first-name">
                  Nom
                </label>
                <input type="text" id="first-name" />
                <label for="last-name">
                  Prénom
                </label>
                <input type="text" id="last-name" />
                <label for="email">
                  Email
                </label>
                <input type="email" id="email" />
                <label for="message">
                  Votre message
                </label>
                <textarea id="message" rows="6" cols="60"></textarea>
                ${submitButtonHtml}
              </form>
            </div>
            <div id="contact-success-wrapper">
              <p>
                Votre message a bien été envoyé à ${this._photographer.name}.
              </p>
              <p>
                Merci pour l'intérêt que vous portez à son travail.
              </p>
            </div>`;
  }

  _displaySuccessfullSubmit() {
    const modalFormWrapper = document.getElementById("contact-form-wrapper");
    const modalSuccessWrapper = document.getElementById(
      "contact-success-wrapper"
    );

    const modalHeight = getComputedStyle(modalFormWrapper).height;

    modalFormWrapper.style.height = 0;
    modalSuccessWrapper.style.height = modalHeight;
  }

  addSubmitFormEvent() {
    document.getElementById("contact-form").onsubmit = (e) => {
      e.preventDefault();

      const firstName = document.getElementById("first-name");
      const lastName = document.getElementById("last-name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      // TO DO: add inputs validations and custom errorm message

      const userInputs = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        message: message.value,
      };

      console.log("User inputs to POST to back-end:", userInputs);

      this._displaySuccessfullSubmit();
    };
  }
}

class DisplayedImage {
  /**
   * @constructs
   * @param {Photographer} photographer 
   * @param {Medium} medium 
   */
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
  /**
   * @constructs
   * @param {Photographer} photographer 
   * @param {Medium} medium 
   */
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
  /**
   * @constructs
   * @param {Photographer} photographer 
   * @param {Medium} medium 
   */
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

export class MediaModal extends Modal {
  /**
   * @constructs
   * @param {Photographer} photographer 
   * @param {MediaList} mediaList 
   * @param {number} displayedMediumId 
   */
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

    return `<i class="fas fa-times" id="close-icon"></i>
            <div class="c-media-modal__carousel">
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

  _displayMedium(mediumIndex) {
    const mediumContainer = document.getElementById("medium");
    const mediumTitle = document.getElementById("medium-title");
    const mediumToDisplay = this._mediaList.media[mediumIndex];

    mediumContainer.innerHTML = new DisplayedMediumFactory(
      this._photographer,
      mediumToDisplay
    ).html;
    mediumTitle.textContent = mediumToDisplay.title;
  }

  addNavigationEvents() {
    const modalBackground = document.getElementById("modal-bg");
    const modalWindow = document.getElementById("modal-window");
    const leftArrow = document.querySelector(".fa-chevron-left");
    const rightArrow = document.querySelector(".fa-chevron-right");

    let currentMediumIndex = this._displayedMediumIndex;
    let mediaListLength = this._mediaList.media.length;

    leftArrow.onclick = () => {
      currentMediumIndex = (currentMediumIndex + 1) % mediaListLength;

      this._displayMedium(currentMediumIndex);
    };

    rightArrow.onclick = () => {
      currentMediumIndex =
        (currentMediumIndex + mediaListLength - 1) % mediaListLength;

      this._displayMedium(currentMediumIndex);
    };

    document.onkeydown = (key) => {
      if (key.code === "ArrowLeft") {
        currentMediumIndex = (currentMediumIndex + 1) % mediaListLength;

        this._displayMedium(currentMediumIndex);
      }

      if (key.code === "ArrowRight") {
        currentMediumIndex =
          (currentMediumIndex + mediaListLength - 1) % mediaListLength;

        this._displayMedium(currentMediumIndex);
      }

      if (key.code === "Escape") {
        modalBackground.classList.remove("displayed");
        modalWindow.innerHTML = "";
      }
    };
  }
}
