import autoCompleteAdress from "../ApiCalls/OpenRouteService";
import { Request, Response, Router } from "express";

export const geoCodingRoute = Router();

geoCodingRoute.post("/geoCoding", async (req: Request, res: Response) => {
  const { adress } = req.body;

  if (adress && typeof adress === "string")
    res.send(await autoCompleteAdress(adress));
  else {
    res.json({
      success: false,
      message: "Missing parameters",
    });
  }
});
