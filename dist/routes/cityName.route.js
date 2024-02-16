"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityDataRoute = void 0;
const express_1 = require("express");
const Adresses_1 = require("../ApiCalls/Adresses");
exports.cityDataRoute = (0, express_1.Router)();
exports.cityDataRoute.post("/cityName", async (req, res) => {
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
exports.cityDataRoute.post("/cityData", async (req, res) => {
    const { adress } = req.body;
    if (adress && typeof adress === "string")
        res.send(await (0, Adresses_1.getLocationByName)(adress));
    else {
        res.json({
            success: false,
            message: "Missing parameters",
        });
    }
});
//# sourceMappingURL=cityName.route.js.map