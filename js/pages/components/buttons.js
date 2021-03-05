"use strict";

export class Button {
  constructor(cssClasses, type, content) {
    this._cssClasses = cssClasses;
    this._type = type;
    this._content = content;
  }

  get html() {
    return `<button class="${this._cssClasses}" type="${this._type}">
              ${this._content}
            </button>`;
  }
}

export class LikesButton extends Button {
  constructor(cssClasses, type, content, mediumId) {
    super(cssClasses, type, content);
    this._mediumId = mediumId;
  }

  get html() {
    return `<button class="${this._cssClasses}" type="${this._type}" 
                    data-medium-id="${this._mediumId}">
              <span id="likes-quantity-${this._mediumId}">
                ${this._content}
              </span>&nbsp;<i class="fas fa-heart"></i>
            </button>`;
  }
}
