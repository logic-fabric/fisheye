"use strict";

export class DataFetcher {
  constructor(dataSource) {
    this._dataSource = dataSource;
  }

  async fetchSource() {
    try {
      let response = await fetch(this._dataSource);

      if (response.ok) {
        let json = await response.json();

        return json;
      } else {
        console.error(
          `HTTP-error-${response.status} while fetchning ${this._dataSource}`
        );
      }
    } catch (err) {
      console.error(
        `An error occured while fecthing ${this._dataSource} : ${err}`
      );
    }
  }
}
