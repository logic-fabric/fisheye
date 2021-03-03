"use strict";

class MediaTag {
  constructor(photographer, tag, checked) {
    this.photographer = photographer;
    this.tag = tag;
    this.checked = checked;
  }

  get html() {
    return this.checked
      ? `<li class="c-tag c-tag--checked">
          <a  
            href="#photographer:${this.photographer.name.replace(/ /, "-")}#${
          this.tag
        }"
          >
            #${this.tag}
          </a>
        </li>`
      : `<li class="c-tag">
          <a 
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
      ? `<li  class="c-tag c-tag--checked">
          <a href="#${this.tag}">#${this.tag}</a>
        </li>`
      : `<li class="c-tag"><a href="#${this.tag}">#${this.tag}</a></li>`;
  }
}

export class MediaTagsNav {
  constructor(photographer, checkedTag) {
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

export class PhotographersTagsNav {
  constructor(tagsList, checkedTag) {
    this.tagsList = tagsList;
    this.checkedTag = checkedTag;
  }

  get html() {
    let htmlContent = "<nav class='lg6 md6 sm6'><ul>";

    for (let tag of this.tagsList) {
      htmlContent += new PhotographerTag(tag, tag === this.checkedTag).html;
    }
    htmlContent += "</ul></nav>";

    return htmlContent;
  }
}
