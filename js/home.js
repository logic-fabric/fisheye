import { DataHandler } from "./data/dataHandler.js";
import { HomePageBuilder } from "./pages/homeBuilder.js";

const DATA_SOURCE = "/data/FishEyeDataFR.json";
const TAGS = ["portrait", "events", "travel", "animals"];

const dataHandler = new DataHandler(DATA_SOURCE);

new HomePageBuilder(dataHandler, TAGS);
