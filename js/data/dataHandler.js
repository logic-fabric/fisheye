"use strict";

export class DataHandler {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async readSource() {
    try {
      let response = await fetch(this.dataSource);
      let json = await response.json();

      return json;
    } catch (err) {
      console.error(
        `An error occured while fecthing ${this.dataSource} : ${err}`
      );
    }
  }
}
