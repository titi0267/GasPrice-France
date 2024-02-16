import { autoCompleteAdress } from "../ApiCalls/Adresses";
import { generateGeoJsonCoordinates } from "../ApiCalls/Osrm";
import { Request, Response, Router } from "express";

export const geoCodingRoute = Router();

geoCodingRoute.post("/geoJson", async (req: Request, res: Response) => {
  const { start, end } = req.body;

  if (start && end && typeof start === "string" && typeof end === "string")
    res.send(await generateGeoJsonCoordinates(start, end));
  else {
    res.json({
      success: false,
      message: "Missing parameters",
    });
  }
});
