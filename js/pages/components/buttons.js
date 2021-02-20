"use strict";

export class Button {
  constructor(cssClasses, type, content) {
    this.cssClasses = cssClasses;
    this.type = type;
    this.content = content;
  }

  get html() {
    return `<button class="${this.cssClasses}" type='${this.type}'>
              ${this.content}
            </button>`;
  }
}
