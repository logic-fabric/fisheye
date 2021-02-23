"use strict";

export class Button {
  constructor(cssClasses, type, content) {
    this.cssClasses = cssClasses;
    this.type = type;
    this.content = content;
  }

  get html() {
    return `<button class="${this.cssClasses}" type="${this.type}">
              ${this.content}
            </button>`;
  }
}

export class LikesButton extends Button {
  constructor(cssClasses, type, content, mediumId) {
    super(cssClasses, type, content);
    this.mediumId = mediumId;
  }

  get html() {
    return `<button class="${this.cssClasses}" type="${this.type}" 
                    data-medium-id="${this.mediumId}">
              <span id="likes-quantity-${this.mediumId}">
                ${this.content}
              </span>
              &nbsp;<i class="fas fa-heart"></i>
            </button>`;
  }
}
