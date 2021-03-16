"use strict";

class PhotographerTag {
  constructor(tag, checked) {
    this._tag = tag;
    this._checked = checked;
  }

  get html() {
    return this._checked
      ? `<li  class="c-tag c-tag--checked">
          <a href="#${this._tag}" lang="en">#${this._tag}</a>
        </li>`
      : `<li class="c-tag">
          <a href="#${this._tag}" lang="en">#${this._tag}</a>
        </li>`;
  }
}

export class PhotographersTagsNav {
  constructor(tagsList, checkedTag) {
    this._tagsList = tagsList;
    this._checkedTag = checkedTag;
  }

  get html() {
    let htmlContent = "<nav class='lg6 md6 sm6'><ul>";

    for (let tag of this._tagsList) {
      htmlContent += new PhotographerTag(tag, tag === this._checkedTag).html;
    }
    htmlContent += "</ul></nav>";

    return htmlContent;
  }
}

class MediaTag {
  constructor(photographer, tag, checked) {
    this._photographer = photographer;
    this._tag = tag;
    this._checked = checked;
  }

  get html() {
    return this._checked
      ? `<li class="c-tag c-tag--checked">
        <a href="#photographer:${this._photographer.slug}#${this._tag}"
           lang="en">
          #${this._tag}
        </a>
        </li>`
      : `<li class="c-tag">
          <a href="#photographer:${this._photographer.slug}#${this._tag}"
             lang="en">
            #${this._tag}
          </a>
        </li>`;
  }
}

export class MediaTagsNav {
  constructor(photographer, checkedTag) {
    this._photographer = photographer;
    this._checkedTag = checkedTag;
  }

  get html() {
    let htmlContent = "<nav><ul>";

    const tags = [...this._photographer.tags];
    tags.unshift("all");

    for (let tag of tags) {
      htmlContent += new MediaTag(
        this._photographer,
        tag,
        tag === this._checkedTag
      ).html;
    }
    htmlContent += "</ul></nav>";

    return htmlContent;
  }
}
