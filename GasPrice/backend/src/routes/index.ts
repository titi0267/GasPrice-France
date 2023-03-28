import express from "express";
import { gasStationRoute } from "./gasStation.route";
import { defaultRoute } from "./defaultRoute";
import { geoCodingRoute } from "./openRouteService.route";

export const routes = express.Router();

routes.use(gasStationRoute);
routes.use(defaultRoute);
routes.use(geoCodingRoute);
