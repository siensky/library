import type { FastifyInstance } from "fastify";
import services from "../services";
import { httpError } from "../error/httpError";


export default async function bookRoutes(fastifyServer: FastifyInstance) {
    fastifyServer.get<{ Params: {id: string} }>("/books/:id", async(request, reply) => {
        const { id } = request.params 

        const book = await services.booksServices.getBookById(id)
        if (!book) {
            throw httpError(404, "Book not found")
        }
        return reply.code(200).send(book)
    } )
}