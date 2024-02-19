import express from "express";
import { gasStationRoute } from "./gasStation.route";
import { defaultRoute } from "./defaultRoute";
import { geoCodingRoute } from "./osrm.route";
import { geoCodeRoute } from "./geoCode.route";
import { cityDataRoute } from "./cityName.route";

export const routes = express.Router();

routes.use(gasStationRoute);
routes.use(defaultRoute);
routes.use(geoCodingRoute);
routes.use(geoCodeRoute);
routes.use(cityDataRoute);
