"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGeoJsonCoordinates = void 0;
const request_services_1 = __importDefault(require("../../services/request.services"));
const env_1 = __importDefault(require("../../env"));
//coords format 8.681495,49.41461
const generateGeoJsonCoordinates = async (start, end) => {
    const generationResult = await (0, request_services_1.default)(`https://api.openrouteservice.org/v2/directions/driving-car?api_key=${env_1.default.openRouteServiceApiKey}&start=${start}&end=${end}`, "GET", "OpenRouteService");
    return generationResult.features;
};
exports.generateGeoJsonCoordinates = generateGeoJsonCoordinates;
//# sourceMappingURL=index.js.map