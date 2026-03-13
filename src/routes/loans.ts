import type { FastifyInstance } from "fastify/types/instance";
import { createLoanSchema, returnBookSchema } from "../schemas/schemas";
import controllers from "../controllers/controllers";



export default async function loansRoutes(fastifyServer: FastifyInstance) {

    fastifyServer.post(
      "/",
      { preHandler: [fastifyServer.authenticate], schema: createLoanSchema },
      controllers.loanControllers.newLoan
    );

    fastifyServer.get(
        "/",
        { preHandler: [fastifyServer.adminAuthenticate]},
        controllers.loanControllers.getLoans
      );

      fastifyServer.get(
        "/user",
        { preHandler: [fastifyServer.authenticate] },
        controllers.loanControllers.getLoansBySub
      );

      fastifyServer.patch(
        "/:id/return",
        { preHandler: [fastifyServer.authenticate], schema: returnBookSchema, config: {rateLimit: {max: 10, timeWindow: "1 minute",}} },
        controllers.loanControllers.returnBook
      );
      
      fastifyServer.get(
        "/book/:bookId/time",
        controllers.loanControllers.getTimeRemaining
      );
  }