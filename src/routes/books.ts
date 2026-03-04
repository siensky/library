import type { FastifyInstance } from "fastify";
import controllers from "../controllers/controllers";
import { createBookSchema } from "../schemas/schemas";
import type { Books } from "../types/db";

export default async function bookRoutes(fastifyServer: FastifyInstance) {
  fastifyServer.get("/books/:id", controllers.booksControllers.getBookById);
  fastifyServer.post<{ Body: Omit<Books, "id"> }>(
    "/books",
    {
      preHandler: [fastifyServer.adminAuthenticate],
      schema: createBookSchema,
    },
    controllers.booksControllers.insertBook
  );
}
