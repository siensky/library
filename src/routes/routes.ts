import type { FastifyInstance, FastifyPluginOptions } from "fastify";


async function routes (
    fastifyServer: FastifyInstance,
    options: FastifyPluginOptions
) {

    fastifyServer.route({
        method: "GET",
        url: "/books",
        handler: () => {}
    })

    fastifyServer.route({
        method: "GET",
        url: "/books/:id",
        handler:() => {}
    })

    fastifyServer.route({
        method: "GET",
        url: "/profile",
        handler:() => {}
    })

    fastifyServer.route({
        method: "POST",
        url: "/add_book",
        handler:() => {}
    })

    fastifyServer.route({
        method: "PUT",
        url: "/books/:id",
        handler:() => {}
    })

    fastifyServer.route({
        method: "DELETE",
        url: "/books/:id",
        handler:() => {}
    })

    fastifyServer.route({
        method: "GET",
        url: "/authors",
        handler:() => {}
    })

    fastifyServer.route({
        method: "GET",
        url: "/authors/:id",
        handler:() => {}
    })
    
    fastifyServer.route({
        method: "POST",
        url: "/authors",
        handler:() => {}
    })

    fastifyServer.route({
        method: "DELETE",
        url: "/authors/:id",
        handler:() => {}
    })

    fastifyServer.route({
        method: "PUT",
        url: "/authors/:id",
        handler:() => {}
    })

    fastifyServer.route({
        method: "POST",
        url: "/new_loan",
        handler:() => {}
    })

    fastifyServer.route({
        method: "GET",
        url: "/loans",
        handler:() => {}
    })

    fastifyServer.route({
        method: "GET",
        url: "/loans/:id",
        handler:() => {}
    })

}

export  default routes