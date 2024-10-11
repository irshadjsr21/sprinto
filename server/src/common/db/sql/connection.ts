import { env } from "@/common/utils/envConfig";
import { logger } from "@/server";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(env.POSTGRES_URL);

export const connectPostgress = async () => {
  await sequelize.authenticate();
  logger.info("Postgress Connection has been established successfully.");
};
