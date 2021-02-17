"use strict";

export class PageBuilder {
  constructor(photographersList, mediaList) {
    this.photographersList = photographersList;
    this.photographersTags = photographersList.collectSortedTags();

    this.mediaList = mediaList;
  }

  renderPage(photographer, tag) {
    if (photographer) {
      this.renderPhotographerPage(photographer, tag);
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

  renderPhotographerPage(photographer, tag) {
    console.log(
      `Building PhotographerPage for '${photographer.name}' filtered by '${tag}'...`
    );

    this.renderPhotographerPageHeader(tag);
    this.renderPhotographerPageMain(photographer, tag);

    console.log("-----");
  }

  renderPhotographerPageHeader() {
    const header = document.querySelector("header");

    header.innerHTML = this.templateLogo();

    console.log("Builded header >", header);
  }

  renderPhotographerPageMain(photographer, checkedTag) {
    const main = document.querySelector("main");

    let htmlContent = "";
    htmlContent += this.templatePhotographerBanner(photographer, checkedTag);
    htmlContent += this.templateMediaFilters();
    htmlContent += this.templateMediaCards(photographer, checkedTag);

    main.innerHTML = htmlContent;

    console.log("Builded main >", main);
  }

  templateLogo() {
    return `<a class="c-logo__box" href="#">
              <img
                class="c-logo__img"
                src="./img/logo-fisheye.png"
                alt="Logo de FishEye"
                width="200"
                height="50"
              />
            </a>`;
  }

  templateUpButton() {
    return "<button type='button'>Revenir en haut</button>";
  }

  templatePhotographerTag(tag, checked) {
    return checked
      ? `<li><a class="c-tag c-tag--checked" href="#${tag}">#${tag}</a></li>`
      : `<li><a class="c-tag" href="#${tag}">#${tag}</a></li>`;
  }

  templateNavTags(checkedTag) {
    let htmlContent = "<nav><ul>";

    for (let tag of this.photographersTags) {
      htmlContent += this.templatePhotographerTag(tag, tag === checkedTag);
    }
    htmlContent += "</ul></nav>";

    return htmlContent;
  }

  templatePhotographersCards(tag) {
    let htmlContent = "<div class=row-12>";

    for (let photographer of this.photographersList.filterByTag(tag)) {
      let cardHtmlContent = "<article class='lg4 md4 sm4'>";

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
    return `<a href="#photographer:${photographer.name.replace(/ /, "-")}">
              <img 
                src="img/photographers/${photographer.portrait}" 
                alt="${photographer.name}" width="200" height="200" 
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
      htmlContent += this.templatePhotographerTag(tag);
    }
    htmlContent += "</ul></nav>";

    return htmlContent;
  }

  templateMediaTag(photographer, tag, checked) {
    return checked
      ? `<li>
          <a 
            class="c-tag c-tag--checked" 
            href="#photographer:${photographer.name.replace(/ /, "-")}"
          >
            #${tag}
          </a>
        </li>`
      : `<li>
          <a 
            class="c-tag" 
            href="#photographer:${photographer.name.replace(/ /, "-")}"
          >
            #${tag}
          </a>
        </li>`;
  }

  templatePhotographerBanner(photographer, checkedTag) {
    let htmlContent = `<section>
              <h1>${photographer.name}</h1>

              <p>${photographer.city}, ${photographer.country}</p>
              <p>${photographer.tagline}</p>
              <nav><ul>`;

    for (let tag of photographer.tags) {
      htmlContent += this.templateMediaTag(
        photographer,
        tag,
        tag === checkedTag
      );
    }

    htmlContent += `</ul></nav>
                    <button type="button">Contactez-moi</button>
                    <img 
                      src="img/photographers/${photographer.portrait}" 
                      alt="${photographer.name}" width="200" height="200" 
                    />
                  </section>`;

    return htmlContent;
  }

  templateMediaFilters() {
    return `<label for="media-filter">Trier par</label>
            <select id="media-filter" name="media-filter">
              <option value="popularity">Popularité</option>
              <option value="date">Date</option>
              <option value="title">Titre</option>
            </select>`;
  }

  templateMediaCards(photographer, checkedTag) {
    let htmlContent = "<div class=row-12>";

    const photographerMedia = this.mediaList.filterByPhotographerId(
      photographer.id
    );

    console.log("photographerId >", photographer);
    console.log("photographerMedia >", photographerMedia);

    for (let medium of photographerMedia) {
      let cardHtmlContent = "<article class='lg4 md4 sm4'>";

      console.log(medium.filename, medium);

      cardHtmlContent += this.templateMediumCardImage(photographer, medium);

      cardHtmlContent += "</article>";

      htmlContent += cardHtmlContent;
    }

    htmlContent += "</div>";

    return htmlContent;
  }

  templateMediumCardImage(photographer, medium) {
    return `<a href="#photographer:${photographer.name.replace(/ /, "-")}">
              <img 
                src="img/${photographer.name
                  .replace(/ /, "")
                  .replace(/-/, "")}/${medium.filename}" 
                alt="${medium.altText} for ${medium.filename}" 
                width="200" height="200"
              />
            </a>
            <h2>${medium.filename}</h2>
            <p>${medium.price}&nbsp;€</p>
            <p>${medium.likes} <i class="fas fa-heart"></i></p>`;
  }
}
