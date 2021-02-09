"use strict";

export class HomePageBuilder {
  constructor(dataHandler, tags) {
    this.dataHandler = dataHandler;
    this.tags = tags;

    this.asyncBuild();
  }

  async asyncBuild() {
    this.data = await this.dataHandler.readSource();

    this.renderHeaderTagNav(this.tags);
    this.renderPhotographerCards(this.data.photographers);
  }

  renderHeaderTagNav(tags) {
    const tagNav = document.querySelector("#header-tagnav ul");
    let htmlContent = "";

    for (let tag of tags) {
      htmlContent += this.templateTag(tag);
    }

    tagNav.innerHTML = htmlContent;
  }

  renderPhotographerCards(photographers) {
    const cardsContainer = document.getElementById("photographer-cards");
    const photographerCard = document.createElement("article");

    let htmlContent = "";

    for (let photographer of photographers) {
      htmlContent += this.templateCardFocusableArea(photographer);
      htmlContent += this.templateCardInfos(photographer);
      htmlContent += this.templateCardTags(photographer);
    }

    photographerCard.innerHTML = htmlContent;
    cardsContainer.appendChild(photographerCard);
  }

  templateTag(tag) {
    return `<li><button type="button">#${tag}</button></li>`;
  }

  templateCardFocusableArea(photographer) {
    return `<a href="#">
              <img src="img/logo-fisheye.png" alt="" wifth="48" height="48" />
              <h2>${photographer.name}</h2>
            </a>`;
  }

  templateCardInfos(photographer) {
    return `<p>${photographer.city}, ${photographer.country}</p>
            <p>${photographer.tagline}</p>
            <p>${photographer.price}&nbsp;€/jour</p>`;
  }

  templateCardTags(photographer) {
    let htmlContent = "<nav><ul>";

    for (let tag of photographer.tags) {
      htmlContent += this.templateTag(tag);
    }

    htmlContent += "</ul></nav>";

    return htmlContent;
  }
}
