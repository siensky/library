import type { FastifyInstance, FastifyPluginOptions } from "fastify";
import bookRoutes from "./books";

async function routes(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions
) {
  fastifyServer.get("/", async (request, reply) => {
    return reply.code(200).send({
      message: "Library API",
      version: "1.0.0",
      endpoints: {
        books: "/books",
      },
    });
  });

  fastifyServer.register(bookRoutes);

//   fastifyServer.route({
//     method: "GET",
//     url: "/books",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "GET",
//     url: "/profile",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "POST",
//     url: "/add_book",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "PUT",
//     url: "/books/:id",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "DELETE",
//     url: "/books/:id",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "GET",
//     url: "/authors",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "GET",
//     url: "/authors/:id",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "POST",
//     url: "/authors",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "DELETE",
//     url: "/authors/:id",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "PUT",
//     url: "/authors/:id",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "POST",
//     url: "/new_loan",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "GET",
//     url: "/loans",
//     handler: () => {},
//   });

//   fastifyServer.route({
//     method: "GET",
//     url: "/loans/:id",
//     handler: () => {},
//   });
}

export default routes;
