import auth from "../auth/auth";
import { InternalError, NotFound } from "../error/error";
import type { Author } from "../types/db";
import db from "./db";


export async function getAuthors (): Promise<Author[]> {
    return await db<Author[]>`
    SELECT * FROM authors
    `

}

export async function getAuthorsById(id: string): Promise<Author | null> {
    const result = await db<Author[]>`
        SELECT * FROM authors WHERE id = ${id}
    `

    return result[0] ?? null
}

export async function insertAuthor(author: Omit<Author, "id">): Promise<Author> {
    const result = await db<Author[]>`
    INSERT INTO authors (
        name, description
    ) VALUES(
        ${author.name},
        ${author.description}
    ) RETURNING *
    `

    const newAuthor = result[0]
    if(!newAuthor){
        throw new InternalError("Failed to insert author")
    }
    return newAuthor
}

export async function updateAuthor(id: string, updateData: Partial<Omit<Author, "id">>): Promise<Author> {
    const result = await db<Author[]>`
        UPDATE authors 
        SET ${db(updateData)}
        WHERE id = ${id}
        RETURNING *
    `

    const updatedAuthor = result[0]
    if(!updatedAuthor) {
        throw new NotFound("Author not found")
    }
    return updatedAuthor
}

export async function deleteAuthor(id: string): Promise<void> {
    const result = await db`
        DELETE FROM authors WHERE id = ${id}
    `
    if(result.count ===0) {
        throw new NotFound("Author not found, nothing deleted")
    }
}