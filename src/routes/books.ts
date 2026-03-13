import type { FastifyInstance } from "fastify";
import controllers from "../controllers/controllers";
import { createBookSchema, updateBookSchema } from "../schemas/schemas";
import type { Books } from "../types/db";

export default async function bookRoutes(fastifyServer: FastifyInstance) {

  fastifyServer.get("/", controllers.booksControllers.getBooks);

  fastifyServer.get("/:id", controllers.booksControllers.getBookById);

  fastifyServer.post<{ Body: Omit<Books, "id"> }>(
    "/",
    {
      preHandler: [fastifyServer.adminAuthenticate],
      schema: createBookSchema,
    },
    controllers.booksControllers.insertBook
  );

  fastifyServer.put<{
    Params: { id: string };
    Body: Partial<Omit<Books, "id">>;
  }>(
    "/:id",
    { preHandler: [fastifyServer.adminAuthenticate], schema: updateBookSchema },
    controllers.booksControllers.updateBook
  );
  
  fastifyServer.delete<{
    Params: { id: string };
  }>(
    "/:id",
    { preHandler: [fastifyServer.adminAuthenticate] },
    controllers.booksControllers.deleteBook
  );
}
