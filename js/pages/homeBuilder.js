"use strict";

export class HomePageBuilder {
  constructor(dataHandler) {
    this.dataHandler = dataHandler;

    this.asyncBuild();
  }

  async asyncBuild() {
    this.data = await this.dataHandler.readSource();

    this.photographersTags = this.collectSortedPhotographersTags(
      this.data.photographers
    );
    this.renderHeaderTagNav(this.photographersTags);

    this.renderPhotographerCards(this.data.photographers);
  }

  collectPhotographersTags(photographers) {
    let photographersTags = new Set();

    for (let photographer of photographers) {
      for (let tag of photographer.tags) {
        photographersTags.add(tag);
      }
    }
    return photographersTags;
  }

  collectSortedPhotographersTags(photographers) {
    let photographersTags = this.collectPhotographersTags(photographers);
    let sortedTags = [...photographersTags].sort();

    return sortedTags;
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

    for (let photographer of photographers) {
      const photographerCard = document.createElement("article");
      let htmlContent = "";

      htmlContent += this.templateCardFocusableArea(photographer);
      htmlContent += this.templateCardInfos(photographer);
      htmlContent += this.templateCardTags(photographer);

      photographerCard.innerHTML = htmlContent;
      photographerCard.classList.add("lg4");
      cardsContainer.appendChild(photographerCard);
    }
  }

  templateTag(tag) {
    return `<li><button type="button">#${tag}</button></li>`;
  }

  templateCardFocusableArea(photographer) {
    return `<a href="#">
              <img 
                src="img/photographers/${photographer.portrait}" 
                alt="${photographer.name}" wifth="200" height="200" 
              />
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
    let photographerSortedTags = photographer.tags.sort();

    for (let tag of photographerSortedTags) {
      htmlContent += this.templateTag(tag);
    }

    htmlContent += "</ul></nav>";

    return htmlContent;
  }
}
