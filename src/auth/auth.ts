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


//verifiera auth0 token med getPublicKey

async function auth(
  fastifyServer: FastifyInstance,
  _options: FastifyPluginOptions
) {
  await fastifyServer.register(fastifyJwt, {
    secret: getPublicKey as any,
    decode: { complete: true },
  });

  fastifyServer.decorate("authenticate", async (
    request: FastifyRequest,
    _reply: FastifyReply
  ) => {
    try {
      await request.jwtVerify();
    } catch (error) {
      throw new Unauthorized("You are not authorized");
    }
  });

  //gör decorate för att kunna kolla om rollen är user eller admin som jag använder som middleware i routes. 


  fastifyServer.decorate(
    "adminAuthenticate",
    async (request: FastifyRequest, _reply: FastifyReply) => {
      try {
        const decodedToken = await request.jwtVerify<TokenPayload>();

        const userRole = decodedToken["https://library.com/role"]

        if (userRole !== "admin") {
          throw new Forbidden("Admin access required");
        }
      } catch (error: any) {
        if (error.statusCode === 403) throw error;

        throw new Unauthorized("Invalid or expired token");
      }
    }
  );
}

export default fastifyPlugin(auth);
