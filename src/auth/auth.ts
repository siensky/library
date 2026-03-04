import fastifyJwt from "@fastify/jwt";
import type {
  FastifyInstance,
  FastifyPluginOptions,
  FastifyReply,
  FastifyRequest,
} from "fastify";

import fastifyPlugin from "fastify-plugin";
import getPublicKey from "./jwks";
import type { TokenPayload } from "../types/auth";
import { Forbidden, Unauthorized } from "../error/error";


// Vi modifierar den inbyggda typen FastifyInstance så att TS vet om att
// jag har en funktion som heter authenticate på FastifyInstance.
declare module "fastify" {
  interface FastifyInstance {
    authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void>;
    adminAuthenticate(
      request: FastifyRequest,
      reply: FastifyReply
    ): Promise<void>;
  }
}



export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    await request.jwtVerify();
  } catch (error) {
    throw new Unauthorized("You are not authorized")
  }
}

async function auth(
  fastifyServer: FastifyInstance,
  options: FastifyPluginOptions
) {

  await fastifyServer.register(fastifyJwt, {
    secret: getPublicKey,
    decode: { complete: true },
  });

  fastifyServer.decorate("authenticate", authenticate)

  fastifyServer.adminAuthenticate
  fastifyServer.decorate(
    "adminAuthenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const decodedToken = await request.jwtVerify<TokenPayload>();
        const isAdmin = decodedToken.role?.includes("admin")
        if(!isAdmin){
            throw new Forbidden("Admin access required")
        }
      } catch (error: any) {
        if(error?.statusCode) throw error

        throw new Unauthorized("Invalid or expired token");
      
      }
    }
  );
}

export default fastifyPlugin(auth);
