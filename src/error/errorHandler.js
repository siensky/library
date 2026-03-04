import { BaseError, InternalError } from "./error";

export default function errorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    
    if(error instanceof BaseError) {
      const publicError = error.toPublicError()

      return reply.status(error.statusCode).send(publicError)
    }

    console.error(error)

    const unknownError = new InternalError("Unknown error", error)

    return reply
    .status(unknownError.statusCode)
    .send(unknownError.toPublicError())
  });
}

//fastifyplugin instead???

// fastify http errors instead of writing codes manually? sensible?
