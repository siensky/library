import fastify from "fastify";
import routes from "./routes/routes";

const fastifyServer = fastify({ logger: true });

async function start() {
  await fastifyServer.register(routes);

  await fastifyServer.listen({
    host: "0.0.0.0",
    port: 3000,
  });
}

start();
