import type { FastifyInstance } from "fastify/types/instance";
import controllers from "../controllers/controllers";
import { createAuthorSchema, updateAuthorSchema } from "../schemas/schemas";
import type { Author } from "../types/db";


export default async function authorRoutes(fastifyServer: FastifyInstance) {

    fastifyServer.get("/", controllers.authorControllers.getAuthors)

    fastifyServer.get("/:id", controllers.authorControllers.getAuthorsById)

    fastifyServer.post<{Body: Omit<Author, "id">}>(
        "/", {
        preHandler: [fastifyServer.adminAuthenticate],
        schema: createAuthorSchema
    }, controllers.authorControllers.insertAuthor)

    fastifyServer.put<{
        Params: { id: string }
        Body: Partial<Omit<Author, "id">>
      }>(
        "/:id",
        {preHandler: [fastifyServer.adminAuthenticate], schema: updateAuthorSchema},
        controllers.authorControllers.updateAuthor
    )
    
    fastifyServer.delete< {Params: {id: string}}>(
        "/:id",
        {preHandler: [fastifyServer.adminAuthenticate]},
        controllers.authorControllers.deleteAuthor
    )
}