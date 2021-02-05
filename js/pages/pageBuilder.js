"use strict";

export class PageBuilder {
  constructor(domTarget, dataHandler) {
    this.domTarget = domTarget;
    this.dataHandler = dataHandler;

    this.asyncBuild();
  }

  async asyncBuild() {
    this.data = await this.dataHandler.readSource();

    this.render();
  }

  render() {
    let htmlContent = "";

    for (let photographer of this.data.photographers) {
      htmlContent += this.templateName(photographer);
    }

    this.domTarget.innerHTML = htmlContent;
  }

  templateName(photographer) {
    return `<h2>${photographer.name}</h2>`;
  }
}
