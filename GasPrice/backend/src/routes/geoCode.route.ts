import { Request, Response, Router } from "express";
import getCodeFromCoords from "../ApiCalls/GeoServices";

export const geoCodeRoute = Router();

geoCodeRoute.post("/geoCode", async (req: Request, res: Response) => {
  const { coords } = req.body;

  if (coords && coords.length == 2) {
    res.send(await getCodeFromCoords(coords));
  } else {
    res.json({
      success: false,
      message: "Missing parameters",
    });
  }
});
