import fetchGasStations from "../ApiCalls/GasStations";
import { Request, Response, Router } from "express";

export const gasStationRoute = Router();

gasStationRoute.post("/gasStations", async (req: Request, res: Response) => {
  const { region, department } = req.body;
  console.log(region + "|" + department);
  if (
    region &&
    department &&
    typeof region === "string" &&
    typeof department === "string"
  ) {
    res.send(await fetchGasStations(region, department));
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
