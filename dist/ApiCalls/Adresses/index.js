"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationByName = exports.autoCompleteAdress = void 0;
const request_services_1 = __importDefault(require("../../services/request.services"));
const fs = __importStar(require("fs"));
const rawData = fs.readFileSync("/public/data/cities.json", "utf-8");
const data = JSON.parse(rawData);
const autoCompleteAdress = (adress) => {
    const filteredData = data.cities.map(departments => departments.communes.filter((city, index) => {
        const queryString = adress
            .toLowerCase()
            .replace("-", " ")
            .replace("'", " ")
            .replace("è", "e")
            .replace("é", "e")
            .replace("ï", "i")
            .replace("î", "i")
            .replace("â", "a")
            .replace("ô", "o")
            .replace("ê", "e")
            .replace("ë", "e")
            .replace("œ", "oe");
        const initialString = city
            .replace("-", " ")
            .replace("'", " ")
            .replace("è", "e")
            .replace("é", "e")
            .replace("ï", "i")
            .replace("î", "i")
            .replace("â", "a")
            .replace("ô", "o")
            .replace("œ", "oe")
            .replace("ê", "e")
            .replace("ë", "e");
        if (initialString.startsWith(queryString))
            return departments.communes[index];
    }));
    let combinedArray = [].concat(...filteredData);
    return combinedArray.slice(0, 20);
};
exports.autoCompleteAdress = autoCompleteAdress;
const getLocationByName = async (adress) => {
    const cityResult = await (0, request_services_1.default)(`https://api-adresse.data.gouv.fr/search/?q=${adress}&type=municipality&limit=20`, "GET", "api-adresse.data.gouv.fr");
    const refineResult = cityResult.features.map((loc) => {
        return {
            label: loc.properties.label,
            geometry: `${loc.geometry.coordinates[0]},${loc.geometry.coordinates[1]}`,
        };
    });
    return refineResult[0];
};
exports.getLocationByName = getLocationByName;
//# sourceMappingURL=index.js.map