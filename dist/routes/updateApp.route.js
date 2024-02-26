"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAppRoute = void 0;
const express_1 = require("express");
const env_1 = __importDefault(require("../env"));
exports.updateAppRoute = (0, express_1.Router)();
exports.updateAppRoute.post("/update", async (req, res) => {
    const { version } = req.body;
    if (version && typeof version === "string") {
        res.send(env_1.default.version > version);
    }
    else {
        res.json({
            success: false,
            message: "Missing parameters",
        });
    }
});
//# sourceMappingURL=updateApp.route.js.map