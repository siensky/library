import type { FastifyInstance } from "fastify/types/instance";
import controllers from "../controllers/controllers";

export default async function usersRoutes(fastifyServer: FastifyInstance) {
  fastifyServer.post(
    "/login",
    { preHandler: [fastifyServer.authenticate] },
    controllers.userControllers.login
  );

  fastifyServer.get(
    "/profile",
    {preHandler: [fastifyServer.authenticate]},
    controllers.userControllers.getProfile
  )
}
