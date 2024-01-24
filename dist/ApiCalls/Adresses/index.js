"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoCompleteAdress = void 0;
const request_services_1 = __importDefault(require("../../services/request.services"));
const autoCompleteAdress = async (adress) => {
    console.log("GeoCode");
    console.log("address:", adress);
    const autoCompleteResult = await (0, request_services_1.default)(`https://api-adresse.data.gouv.fr/search/?q=${adress}&limit=20&type=municipality`, "GET", "api-adresse.data.gouv.fr");
    const refineResult = [];
    let maxResult = 0;
    autoCompleteResult.features.map(loc => {
        if (maxResult > 50)
            return;
        if (loc.score > 0.5) {
            refineResult.push({
                id: loc.properties.id,
                name: loc.properties.name,
                country: loc.properties.country,
                label: loc.properties.label,
                geometry: [loc.geometry.coordinates[0], loc.geometry.coordinates[1]],
            });
            maxResult += 1;
        }
    });
    return refineResult;
};
exports.autoCompleteAdress = autoCompleteAdress;
//# sourceMappingURL=index.js.map