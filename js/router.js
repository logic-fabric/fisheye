"use strict";

export class Router {
  constructor(pageFactory, photographersList) {
    this._pageFactory = pageFactory;
    this._photographers = photographersList;
  }

  addRouteListener() {
    let comingFromHome;

    window.onhashchange = () => {
      const route = window.location.hash.slice(1);
      let photographer, tag, sortingCriterion;

      if (route.startsWith("photographer")) {
        if (comingFromHome) window.scrollTo(0, 0);

        comingFromHome = false;

        const routeData = route.split(":")[1];
        const routeParameters = routeData.split("#");
        const photographerName = routeParameters[0];

        photographer = this._photographers.findByName(photographerName);
        tag = decodeURIComponent(routeParameters[1]);
        sortingCriterion = routeParameters[2];
      } else {
        if (!comingFromHome) window.scrollTo(0, 0);
        
        comingFromHome = true;

        photographer = "";
        tag = decodeURIComponent(route);
        sortingCriterion = "";
      }

      this._pageFactory.render(photographer, tag, sortingCriterion);
    };
  }
}
