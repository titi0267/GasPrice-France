"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_services_1 = __importDefault(require("../../services/request.services"));
const getCodeFromCoords = async (coords) => {
    const res = await (0, request_services_1.default)(`https://wxs.ign.fr/essentiels/geoportail/geocodage/rest/0.1/reverse?lon=${coords[0].toString()}&lat=${coords[1].toString()}&index=poi&limit=5`, "GET", "GeoServices");
    let departement_code = "01";
    if (res) {
        res.features.forEach(element => {
            if (element.properties.city &&
                element.properties.city.length > 0 &&
                element.properties.citycode &&
                element.properties.citycode.length > 0) {
                element.properties.citycode.forEach(code => {
                    if (code?.length == 2) {
                        departement_code = code;
                    }
                });
            }
        });
    }
    return departement_code;
};
exports.default = getCodeFromCoords;
//# sourceMappingURL=index.js.map