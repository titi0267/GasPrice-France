"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const body_parser_1 = __importDefault(require("body-parser"));
const env_1 = __importDefault(require("./env"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json({ limit: "50mb", type: "application/json" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
//routes
app.use("/", routes_1.routes);
//server listening
app.listen(env_1.default.port, () => {
    console.log(`Listening on port ${env_1.default.port}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map