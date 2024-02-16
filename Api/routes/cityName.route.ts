import { Request, Response, Router } from "express";
import { autoCompleteAdress, getLocationByName } from "../ApiCalls/Adresses";

export const cityDataRoute = Router();

cityDataRoute.post("/cityName", async (req: Request, res: Response) => {
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

cityDataRoute.post("/cityData", async (req: Request, res: Response) => {
  const { adress } = req.body;

  if (adress && typeof adress === "string")
    res.send(await getLocationByName(adress));
  else {
    res.json({
      success: false,
      message: "Missing parameters",
    });
  }
});
