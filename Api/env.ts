import * as dotenv from "dotenv";

dotenv.config();

const ENV = {
  port: (process.env.PORT as string) || "8080",
  openRouteServiceApiKey: process.env.OPEN_ROUTE_SERVICE_API_KEY as string,
};

export default ENV;
