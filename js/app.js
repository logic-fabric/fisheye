"use strict";

import { DataFetcher } from "./data/dataFetcher.js";
import { PageFactory } from "./pages/pageFactory.js";
import { Router } from "./router.js";

export class SinglePageApplication {
  constructor(dataSource) {
    this._dataFetcher = new DataFetcher(dataSource);

    this._init();
  }

  async _init() {
    const data = await this._dataFetcher.fetchSource();

    this.PHOTOGRAPHERS = data.photographers;
    this.MEDIA = data.media;

    this.pageFactory = new PageFactory(this.PHOTOGRAPHERS, this.MEDIA);
    this.pageFactory.render("", "tous");
    window.location.hash = "#tous";

    this._router = new Router(this.pageFactory, this.PHOTOGRAPHERS);

    this._router.addRouteListener();
  }
}
