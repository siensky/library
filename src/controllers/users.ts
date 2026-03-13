import type { FastifyReply } from "fastify/types/reply"
import services from "../services"
import type { FastifyRequest } from "fastify/types/request"
import { NotFound } from "../error/error"



export async function login( request: FastifyRequest,
reply: FastifyReply) {
    const {sub, email, nickname, name} = request.user as any

    const user = await services.userServices.handleUser({
        auth0_sub: sub,
        email: email || "no-email@provided.com",
        username: nickname || name || "GuestUser"
    })

    return reply.code(200).send(user)

}

export async function getProfile(request: FastifyRequest,
    reply: FastifyReply) {
        const {sub} = request.user as any
        const user = await services.userServices.getUserBySub(sub)

        if(!user) {
            throw new NotFound("User not found")
        }
        const loans = await services.loanServices.getLoansById(user.id)

        return reply.send({
            user, loans
        })

      
    }

    