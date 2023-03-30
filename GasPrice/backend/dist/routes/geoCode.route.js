"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoCodeRoute = void 0;
const express_1 = require("express");
const GeoServices_1 = __importDefault(require("../ApiCalls/GeoServices"));
exports.geoCodeRoute = (0, express_1.Router)();
exports.geoCodeRoute.post("/geoCode", async (req, res) => {
    const { coords } = req.body;
    if (coords && coords.length == 2) {
        res.send(await (0, GeoServices_1.default)(coords));
    }
    else {
        res.json({
            success: false,
            message: "Missing parameters",
        });
    }
});
//# sourceMappingURL=geoCode.route.js.map