"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRoute = void 0;
const express_1 = require("express");
exports.defaultRoute = (0, express_1.Router)();
exports.defaultRoute.get("/", (req, res) => {
    res.send("coucou emilie");
});
//# sourceMappingURL=defaultRoute.js.map