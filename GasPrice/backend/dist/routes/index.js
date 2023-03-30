"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const gasStation_route_1 = require("./gasStation.route");
const defaultRoute_1 = require("./defaultRoute");
const openRouteService_route_1 = require("./openRouteService.route");
const geoCode_route_1 = require("./geoCode.route");
exports.routes = express_1.default.Router();
exports.routes.use(gasStation_route_1.gasStationRoute);
exports.routes.use(defaultRoute_1.defaultRoute);
exports.routes.use(openRouteService_route_1.geoCodingRoute);
exports.routes.use(geoCode_route_1.geoCodeRoute);
//# sourceMappingURL=index.js.map