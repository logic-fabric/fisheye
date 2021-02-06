import { DataHandler } from "./data/dataHandler.js";
import { PageBuilder } from "./pages/pageBuilder.js";

const DATA_SOURCE = "/data/FishEyeDataFR.json";

const dataHandler = new DataHandler(DATA_SOURCE);

const domTarget = document.querySelector("main");

new PageBuilder(domTarget, dataHandler);
