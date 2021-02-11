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

    this.addTagsEvents();
  }

  collectPhotographersTags(photographers) {
    let photographersTags = new Set();

    for (let photographer of photographers) {
      for (let tag of photographer.tags) {
        tag = tag.toLowerCase();

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

  sortPhotographersByName(photographers) {
    return [...photographers].sort((p1, p2) => {
      const name1 = p1.name.toLowerCase();
      const name2 = p2.name.toLowerCase();

      if (name1 > name2) return 1;
      if (name1 < name2) return -1;
      return 0;
    });
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
    cardsContainer.innerHTML = "";

    photographers = this.sortPhotographersByName(photographers);

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
    return `<li><button class="tag" type="button">#${tag}</button></li>`;
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

  photographerFilteredByTag(photographers, tagToMatch) {
    let filteredPhotographers = new Set();

    for (let photographer of photographers) {
      for (let tag of photographer.tags) {
        if (tag === tagToMatch) {
          filteredPhotographers.add(photographer);
          break;
        }
      }
    }
    return filteredPhotographers;
  }

  addTagsEvents() {
    const tagButtons = document.querySelectorAll("button.tag");

    tagButtons.forEach((btn) => {
      btn.onclick = () => {
        let tagWithoutHashtag = btn.textContent.slice(1);

        let photographers = this.photographerFilteredByTag(
          this.data.photographers,
          tagWithoutHashtag
        );

        this.renderPhotographerCards(photographers);
      };
    });
  }
}
