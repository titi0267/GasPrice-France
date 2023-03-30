import express from "express";
import { routes } from "./routes";
import bodyParser from "body-parser";
import ENV from "./env";

const app = express();
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//routes
app.use("/", routes);

//server listening
app.listen(ENV.port, () => {
  console.log(`Listening on port ${ENV.port}`);
});

module.exports = app;
