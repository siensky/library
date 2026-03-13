import type { FastifyReply } from "fastify/types/reply";
import type { FastifyRequest } from "fastify/types/request";
import services from "../services";



export async function getLoans(_request: FastifyRequest, reply: FastifyReply) {
    const loans = await services.loanServices.getLoans();
    return reply.code(200).send(loans);
}

export async function getLoansBySub(request: FastifyRequest, reply: FastifyReply) {
    const { sub } = request.user as {sub: string}
    const loan = await services.loanServices.getLoansBySub(sub);
    return reply.code(200).send(loan);
}

export async function newLoan(request: FastifyRequest, reply: FastifyReply) {
  const { book_id } = request.body as {book_id: string}
  const { sub } = request.user as any

  const loan = await services.loanServices.loanBook(book_id, sub);
  return reply.code(201).send(loan);
}



export async function returnBook(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };
  const { sub } = request.user as any;

  const returnedLoan = await services.loanServices.returnBook(id, sub)
  return reply.code(200).send({message: "Book returned", data: returnedLoan})
}

export async function getTimeRemaining(request: FastifyRequest<{ Params: { bookId: string } }>, reply: FastifyReply) {
    const { bookId } = request.params;
    const result = await services.loanServices.getBookTimeRemaining(bookId);
    return reply.code(200).send(result);
}
