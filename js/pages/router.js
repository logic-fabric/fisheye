"use strict";

export class Router {
  constructor(pageFactory, photographersList) {
    this._pageFactory = pageFactory;
    this._photographers = photographersList;
  }

  addRouteListener() {
    window.onhashchange = () => {
      const route = window.location.hash.slice(1);
      let photographer, tag, sortingCriterion;

      if (route.startsWith("photographer")) {
        const routeData = route.split(":")[1];
        const routeParameters = routeData.split("#");
        const photographerName = routeParameters[0];

        photographer = this._photographers.findByName(photographerName);
        tag = routeParameters[1];
        sortingCriterion = routeParameters[2];
      } else {
        photographer = "";
        tag = route;
        sortingCriterion = "";
      }

      this._pageFactory.render(photographer, tag, sortingCriterion);
    };
  }
}
