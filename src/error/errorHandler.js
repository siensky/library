export default function errorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    
    const statusCode = error.statusCode || 500;

    const message =
    statusCode >= 500 ? "Internal server error" : error.message

    reply.code(statusCode).send({
      success: false,
      error: {
        message,
        statusCode,
      },
    });
  });
}

//fastifyplugin instead???

// fastify http errors instead of writing codes manually? sensible?
