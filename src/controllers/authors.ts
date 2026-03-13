import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";
import services from "../services";
import { NotFound } from "../error/error";
import type { Author } from "../types/db";


export async function getAuthors(_request: FastifyRequest,
    reply: FastifyReply) {
        const authors = await services.authorServices.getAuthors()
        return reply.code(200).send(authors)
}

export async function getAuthorsById(request: FastifyRequest< {Params: {id: string}}>,
    reply: FastifyReply) {
        const {id} = request.params
        const author = await services.authorServices.getAuthorsById(id)

        if (!author) {
            throw new NotFound("Author not found")
        }
        return reply.code(200).send(author)
}

export async function insertAuthor(request: FastifyRequest<{ Body: Omit<Author, "id"> }>,
    reply: FastifyReply) {
        const newAuthor = await services.authorServices.insertAuthor(request.body)

        return reply.code(201).send({
            message: "Author successfully added.",
            data: newAuthor
        })
}

export async function updateAuthor(request: FastifyRequest<{
    Params: { id: string }
    Body: Partial<Omit<Author, "id">>
  }>,
    reply: FastifyReply) {
        const {id} = request.params
        const updateData = request.body

        const author = await services.authorServices.updateAuthor(id, updateData)
        return reply.code(200).send({
            message: "Author successfully updated",
            data: author
        })

}

export async function deleteAuthor(request: FastifyRequest< {Params: {id: string}}>,
    reply: FastifyReply) {
        const {id} = request.params 

        await services.authorServices.deleteAuthor(id)
        return reply.code(200).send({
            message: "Author deleted"
        })

}