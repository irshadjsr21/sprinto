import { env } from "@/common/utils/envConfig";
import { logger } from "@/server";
import mongoose from "mongoose";

export const connectMongoDb = async () => {
  await mongoose.connect(env.MONGODB_URL);
  logger.info("MongoDB Connection has been established successfully.");
};
