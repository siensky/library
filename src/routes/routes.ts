import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import bookRoutes from "./books";
import usersRoutes from "./users";
import authorRoutes from "./authors";
import loansRoutes from "./loans";

async function routes(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions
) {
  fastifyServer.get("/", async (_request, reply) => {
    return reply.code(200).send({
      message: "Library API",
      version: "1.0.0",
      endpoints: {
        books: "/books",
        users: "/users",
        authors: "/authors",
        loans: "/loans"
      },
    });
  });

  fastifyServer.register(bookRoutes, {prefix: "/books"});
  fastifyServer.register(usersRoutes, {prefix: "/users"})
  fastifyServer.register(authorRoutes, {prefix: "/authors"})
  fastifyServer.register(loansRoutes, {prefix: "/loans"})


}

export default routes;
