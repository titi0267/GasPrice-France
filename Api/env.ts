import * as dotenv from "dotenv";

dotenv.config();

const ENV = {
  port: (process.env.PORT as string) || "8080",
  version: (process.env.VERSION as string) || "0.0.5",
};

export default ENV;
