"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_services_1 = __importDefault(require("../../services/request.services"));
const getCodeFromCoords = async (coords) => {
    console.log(coords);
    const res = await (0, request_services_1.default)(`https://geo.api.gouv.fr/communes?lon=${coords[0].toString()}&lat=${coords[1].toString()}`, "GET", "GeoServices");
    let departement_code = "01";
    console.log(res);
    if (res && res.length == 1) {
        departement_code = res[0].codeDepartement;
    }
    return departement_code;
};
exports.default = getCodeFromCoords;
//# sourceMappingURL=index.js.map