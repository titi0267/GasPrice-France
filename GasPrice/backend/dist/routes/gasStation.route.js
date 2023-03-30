"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gasStationRoute = void 0;
const GasStations_1 = __importDefault(require("../ApiCalls/GasStations"));
const express_1 = require("express");
exports.gasStationRoute = (0, express_1.Router)();
exports.gasStationRoute.post("/gasStations", async (req, res) => {
    const { code_department } = req.body;
    if (code_department && typeof code_department === "string") {
        res.send(await (0, GasStations_1.default)(code_department));
        // res.json({
        //   success: true,
        //   message: region + department,
        // });
    }
    else {
        res.json({
            success: false,
            message: "Missing parameters",
        });
    }
});
//# sourceMappingURL=gasStation.route.js.map