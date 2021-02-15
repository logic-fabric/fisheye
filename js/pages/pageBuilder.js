"use strict";

export class PageBuilder {
  constructor(photographersList, mediaList) {
    this.photographersList = photographersList;
    this.photographersTags = ["animals", "events"];
    this.mediaList = mediaList;
  }

  renderPage(photographerName, tag) {
    if (photographerName) {
      this.renderPhotographerPage(photographerName, tag);
    } else {
      this.renderHomePage(tag);
    }
  }

  renderHomePage(tag) {
    console.log(`Building HomePage filtered by tag '${tag}'...`);

    this.renderHomePageHeader(tag);
    this.renderHomePageMain(tag);

    console.log("-----");
  }

  renderHomePageHeader(checkedTag) {
    const header = document.querySelector("header");
    let htmlContent = "";

    htmlContent += this.templateLogo();
    htmlContent += this.templateUpButton();
    htmlContent += this.templateNavTags(checkedTag);

    header.innerHTML = htmlContent;

    console.log("Builded header >", header);
  }

  renderHomePageMain(tag) {
    const main = document.querySelector("main");
    let htmlContent = "<h1>Nos photographes</h1>";

    htmlContent += this.templatePhotographersCards(tag);

    main.innerHTML = htmlContent;

    console.log("Builded main >", main);
  }

  renderPhotographerPage(name, tag) {
    console.log(
      `Building PhotographerPage for '${name}' filtered by '${tag}'...`
    );
    console.log("-----");
  }

  templateLogo() {
    return `<div class="c-logo__box">
              <img
                class="c-logo__img"
                src="./img/logo-fisheye.png"
                alt="Logo de FishEye"
                width="200"
                height="50"
              />
            </div>`;
  }

  templateUpButton() {
    return "<button type='button'>Revenir en haut</button>";
  }

  templateTag(tag, checked) {
    return checked
      ? `<li><button class="c-tag" type="button">#${tag}</button></li>`
      : `<li><button class="c-tag c-tag--checked" type="button">#${tag}</button></li>`;
  }

  templateNavTags(checkedTag) {
    let htmlContent = "<nav>";

    for (let tag of this.photographersTags) {
      htmlContent += this.templateTag(tag, tag === checkedTag);
    }
    htmlContent += "</nav>";

    return htmlContent;
  }

  templatePhotographersCards(tag) {
    let htmlContent = "<div class=row-12>";

    for (let photographer of this.photographersList.list) {
      let cardHtmlContent = "<article class='lg4'>";

      cardHtmlContent += this.templatePhotographerCardFocusableArea(
        photographer
      );
      cardHtmlContent += this.templatePhotographerCardInfos(photographer);
      cardHtmlContent += this.templatePhotographerCardTags(photographer);

      cardHtmlContent += "</article>";

      htmlContent += cardHtmlContent;
    }

    htmlContent += "</div>";

    return htmlContent;
  }

  templatePhotographerCardFocusableArea(photographer) {
    return `<a href="#">
              <img 
                src="img/photographers/${photographer.portrait}" 
                alt="${photographer.name}" wifth="200" height="200" 
              />
              <h2>${photographer.name}</h2>
            </a>`;
  }

  templatePhotographerCardInfos(photographer) {
    return `<p>${photographer.city}, ${photographer.country}</p>
            <p>${photographer.tagline}</p>
            <p>${photographer.price}&nbsp;€/jour</p>`;
  }

  templatePhotographerCardTags(photographer) {
    let htmlContent = "<nav><ul>";

    for (let tag of photographer.tags) {
      htmlContent += this.templateTag(tag);
    }
    htmlContent += "</ul></nav>";

    return htmlContent;
  }
}
