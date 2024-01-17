import fetchGasStations from "../ApiCalls/GasStations";
import { Request, Response, Router } from "express";

export const gasStationRoute = Router();

gasStationRoute.post("/gasStations", async (req: Request, res: Response) => {
  const { code_department } = req.body;
  if (code_department && typeof code_department === "string") {
    res.send(await fetchGasStations(code_department));
    // res.json({
    //   success: true,
    //   message: region + department,
    // });
  } else {
    res.json({
      success: false,
      message: "Missing parameters",
    });
  }
});
