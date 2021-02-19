"use strict";

export class Button {
  constructor(cssClasses, type, text) {
    this.cssClasses = cssClasses;
    this.type = type;
    this.text = text;
  }

  get html() {
    return `<button class="${this.cssClasses}" type='${this.type}'>
              ${this.text}
            </button>`;
  }
}
