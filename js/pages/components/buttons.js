"use strict";

export class Button {
  /**
   * @constructs
   * @param {string} cssClasses 
   * @param {string} type 
   * @param {string} content 
   */
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

export class LikeButton extends Button {
  /**
   * @constructs
   * @param {string} cssClasses 
   * @param {string} type 
   * @param {string} content 
   * @param {number} mediumId 
   * @param {boolean} isLiked 
   */
  constructor(cssClasses, type, content, mediumId, isLiked) {
    super(cssClasses, type, content);
    this._mediumId = mediumId;
    this._isLiked = isLiked;
  }

  get html() {
    const iconType = this._isLiked ? "fas" : "far";

    return `<button class="${this._cssClasses}" type="${this._type}" 
                    data-medium-id="${this._mediumId}">
              <span id="likes-quantity-${this._mediumId}">
                ${this._content}
              </span>
              <i class="${iconType} fa-heart" 
                 id="like-icon-${this._mediumId}"></i>
            </button>`;
  }
}
