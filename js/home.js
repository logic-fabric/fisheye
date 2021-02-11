import { DataHandler } from "./data/dataHandler.js";
import { HomePageBuilder } from "./pages/homeBuilder.js";

const DATA_SOURCE = "/data/FishEyeDataFR.json";

const dataHandler = new DataHandler(DATA_SOURCE);

new HomePageBuilder(dataHandler);
