"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_services_1 = __importDefault(require("../../services/request.services"));
const getCodeFromCoords = async (coords) => {
    console.log(coords);
    const res = await (0, request_services_1.default)(`https://api-adresse.data.gouv.fr/reverse?lon=${coords[0]
        .toFixed(2)
        .toString()}&lat=${coords[1].toFixed(2).toString()}&limit=1`, "GET", "GeoServices");
    let departement_code = "01";
    if (res && res.features.length == 1) {
        departement_code = res.features[0].properties.id.substring(0, 2);
    }
    return departement_code;
};
exports.default = getCodeFromCoords;
//# sourceMappingURL=index.js.map