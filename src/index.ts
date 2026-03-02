import fastify from "fastify";
import routes from "./routes/routes";
import auth from "./auth/auth";
import errorHandler from "./error/errorHandler";

const fastifyServer = fastify({ logger: true });

async function start() {
  errorHandler(fastifyServer);

  await fastifyServer.register(auth);

  await fastifyServer.register(routes);

  await fastifyServer.listen({
    host: "0.0.0.0",
    port: 3000,
  });
}

start();
