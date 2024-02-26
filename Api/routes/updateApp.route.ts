import { Request, Response, Router } from "express";
import ENV from "../env";

export const updateAppRoute = Router();

updateAppRoute.post("/update", async (req: Request, res: Response) => {
  const { version } = req.body;
  if (version && typeof version === "string") {
    res.send(ENV.version > version);
  } else {
    res.json({
      success: false,
      message: "Missing parameters",
    });
  }
});
