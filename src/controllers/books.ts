import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";
import services from "../services";
import type { Books } from "../types/db";
import { NotFound } from "../error/error";

export async function getBooks(_request: FastifyRequest, reply: FastifyReply) {
  const books = await services.booksServices.getBooks();
  return reply.code(200).send(books);
}

export async function getBookById(
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const book = await services.booksServices.getBookById(id);

  if (!book) {
    throw new NotFound("Book not found");
  }

  return reply.code(200).send(book);
}

export async function insertBook(
  request: FastifyRequest<{ Body: Omit<Books, "id"> }>,
  reply: FastifyReply
) {
  const newBook = await services.booksServices.insertBook(request.body);

  return reply.code(201).send({
    message: "Book successfully added to the library",
    data: newBook,
  });
}

export async function updateBook(
  request: FastifyRequest<{
    Params: { id: string };
    Body: Partial<Omit<Books, "id">>;
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const updateData = request.body;

  const book = await services.booksServices.updateBook(id, updateData);
  return reply.code(200).send({
    message: "Book successfully updated",
    data: book,
  });
}

export async function deleteBook(
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  await services.booksServices.deleteBook(id);
  return reply.code(200).send({
    message: "Book deleted",
  });
}
