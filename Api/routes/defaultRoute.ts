import { Router } from "express";

export const defaultRoute = Router();

defaultRoute.get("/", (req, res) => {
  res.send("Server up to date");
});

defaultRoute.get("/try", (req, res) => {
  res.send("Route for testing stuff");
});
