import { autoCompleteAdress } from "../ApiCalls/Adresses";
import { generateGeoJsonCoordinates } from "../ApiCalls/OpenRouteService";
import { Request, Response, Router } from "express";

export const geoCodingRoute = Router();

geoCodingRoute.post("/geoCoding", async (req: Request, res: Response) => {
  const { adress } = req.body;
  console.log("Problem", adress);

  if (adress && typeof adress === "string")
    res.send(await autoCompleteAdress(adress));
  else {
    res.json({
      success: false,
      message: "Missing parameters",
    });
  }
});

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
