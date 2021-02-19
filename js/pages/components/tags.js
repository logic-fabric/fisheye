"use strict";

class MediaTag {
  constructor(photographer, tag, checked) {
    this.photographer = photographer;
    this.tag = tag;
    this.checked;
  }

  get html() {
    return this.checked
      ? `<li>
          <a 
            class="c-tag c-tag--checked" 
            href="#photographer:${this.photographer.name.replace(/ /, "-")}#${
          this.tag
        }"
          >
            #${this.tag}
          </a>
        </li>`
      : `<li>
          <a 
            class="c-tag" 
            href="#photographer:${this.photographer.name.replace(/ /, "-")}#${
          this.tag
        }"
          >
            #${this.tag}
          </a>
        </li>`;
  }
}

class PhotographerTag {
  constructor(tag, checked) {
    this.tag = tag;
    this.checked = checked;
  }

  get html() {
    return this.checked
      ? `<li><a class="c-tag c-tag--checked" href="#${this.tag}">
          #${this.tag}
        </a></li>`
      : `<li><a class="c-tag" href="#${this.tag}">#${this.tag}</a></li>`;
  }
}

export class MediaNavTag {
  constructor(photographer, tagsList, checkedTag) {
    this.photographer = photographer;
    this.checkedTag = checkedTag;
  }

  get html() {
    let htmlContent = "<nav><ul>";

    for (let tag of this.photographer.tags) {
      htmlContent += new MediaTag(
        this.photographer,
        tag,
        tag === this.checkedTag
      ).html;
    }
    htmlContent += "</ul></nav>";

    return htmlContent;
  }
}

export class PhotographersNavTag {
  constructor(tagsList, checkedTag) {
    this.tagsList = tagsList;
    this.checkedTag = checkedTag;
  }

  get html() {
    let htmlContent = "<nav><ul>";

    for (let tag of this.tagsList) {
      htmlContent += new PhotographerTag(tag, tag === this.checkedTag)
        .html;
    }
    htmlContent += "</ul></nav>";

    return htmlContent;
  }
}
