import path from "node:path";
import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";

import { getGraphqlRouter } from "@/api/graphql/graphqlRouter";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter";
import { connectMongoDb, connectPostgress } from "@/common/db";
import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import { env } from "@/common/utils/envConfig";

const logger = pino({ name: "server start" });

export const createApp = async () => {
  const app: Express = express();

  // Setup dependencies
  await connectPostgress();
  await connectMongoDb();
  const graphqlRouter = await getGraphqlRouter();

  // Set the application to trust the reverse proxy
  app.set("trust proxy", true);

  app.use(express.static(path.join(__dirname, "..", "public")));

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
  app.use(helmet());
  app.use(rateLimiter);

  // Request logging
  app.use(requestLogger);

  // Routes
  app.use("/api/health-check", healthCheckRouter);
  app.use("/api/graphql", graphqlRouter);

  // Error handlers
  app.use(errorHandler());

  return app;
};

export { logger };
