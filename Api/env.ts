import * as dotenv from "dotenv";

dotenv.config();

const ENV = {
  port: (process.env.PORT as string) || "8080",
};

export default ENV;
