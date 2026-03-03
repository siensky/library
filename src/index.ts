import fastify from "fastify";
import routes from "./routes/routes";
import auth from "./auth/auth";
import errorHandler from "./error/errorHandler";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import { httpError } from "./error/httpError";
import rateLimit from "@fastify/rate-limit";

const fastifyServer = fastify({ logger: true });

async function start() {
  await fastifyServer.register(helmet);

  await fastifyServer.register(cors, {
    origin: "http://localhost:3000",
  });

  await fastifyServer.register(rateLimit, {
    max: 50,
    timeWindow: "1 minute",
  });

  errorHandler(fastifyServer);

  await fastifyServer.register(auth);

  await fastifyServer.register(routes);

  await fastifyServer.listen({
    host: "0.0.0.0",
    port: 3000,
  });
}

start();
