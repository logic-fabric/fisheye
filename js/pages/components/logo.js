"use strict";

export class Logo {
  get html() {
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
}
