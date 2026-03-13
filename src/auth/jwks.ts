import type { FastifyRequest } from "fastify";
import JwksClient from "jwks-rsa";
import { NotFound } from "../error/error";

const AUTH0_JWKS_URI = process.env.AUTH0_JWKS_URI;

if (!AUTH0_JWKS_URI) throw new Error("Please provide jwks uri");

// gör en klient som läser av auth0 jwks url 

const client = JwksClient({
  jwksUri: AUTH0_JWKS_URI,
  cache: true,
  rateLimit: true,
  jwksRequestsPerMinute: 5
});

type JwtHeader = {
  header?: {kid: string}
  kid?: string
}

// funktion som tar emot request, som inte används här, och decodedtoken, med decodedtoken så tar vi
// fram kid som vi i sintur får fram signingkey med och sedan i sin tur public key från auth0 som vi behöver 
// för authentisering

const getPublicKey = async (
  _request: FastifyRequest,
  decodedToken: JwtHeader
): Promise<string> => {
  const kid = decodedToken.header?.kid || decodedToken.kid;

  if(!kid) throw new NotFound("No KID found in token")

  const signingKey = await client.getSigningKey(kid);

  const publicKey = signingKey.getPublicKey();

  return publicKey;
};

export default getPublicKey;
