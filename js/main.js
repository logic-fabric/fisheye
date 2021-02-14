import { DataFetcher } from "./data/dataFetcher.js";
import { Router } from "./pages/router.js";

const DATA_SOURCE = "/data/FishEyeDataFR.json";
const dataFetcher = new DataFetcher(DATA_SOURCE);

new Router(dataFetcher, "");
