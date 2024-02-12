"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGeoJsonCoordinates = void 0;
const request_services_1 = __importDefault(require("../../services/request.services"));
const generateGeoJsonCoordinates = async (start, end) => {
    const generationResult = await (0, request_services_1.default)(`http://router.project-osrm.org/route/v1/driving/${start};${end}?alternatives=2&geometries=geojson&overview=full`, "GET", "osrm");
    generationResult.routes.forEach(route => {
        route.type = "Feature";
        delete route?.legs;
    });
    return generationResult.routes;
};
exports.generateGeoJsonCoordinates = generateGeoJsonCoordinates;
//# sourceMappingURL=index.js.map