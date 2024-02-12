"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoCodingRoute = void 0;
const Adresses_1 = require("../ApiCalls/Adresses");
const Osrm_1 = require("../ApiCalls/Osrm");
const express_1 = require("express");
exports.geoCodingRoute = (0, express_1.Router)();
exports.geoCodingRoute.post("/geoCoding", async (req, res) => {
    const { adress } = req.body;
    if (adress && typeof adress === "string")
        res.send(await (0, Adresses_1.autoCompleteAdress)(adress));
    else {
        res.json({
            success: false,
            message: "Missing parameters",
        });
    }
});
exports.geoCodingRoute.post("/geoJson", async (req, res) => {
    const { start, end } = req.body;
    if (start && end && typeof start === "string" && typeof end === "string")
        res.send(await (0, Osrm_1.generateGeoJsonCoordinates)(start, end));
    else {
        res.json({
            success: false,
            message: "Missing parameters",
        });
    }
});
//# sourceMappingURL=osrm.route.js.map