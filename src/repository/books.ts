import { InternalError, NotFound } from "../error/error";
import type { Books } from "../types/db";
import type { BookWithAuthor } from "../types/public";
import db from "./db";

const BOOK_FIELDS = db`
  b.id, b.isbn, b.author_id, b.title, b.year, b.description, b.genre,
  a.name as author_name
`;

export async function getBooks(): Promise<BookWithAuthor[]> {
  return await db<BookWithAuthor[]>`
    SELECT ${BOOK_FIELDS} FROM books b
    LEFT JOIN authors a ON b.author_id = a.id
  `
}

export async function getBookById(id: string): Promise<BookWithAuthor | null> {
  const result = await db<BookWithAuthor[]>`
    SELECT ${BOOK_FIELDS}
     FROM books b 
     LEFT JOIN authors a ON b.author_id = a.id
     WHERE b.id = ${id}
    `;

  return result[0] ?? null;
}

export async function insertBook(book: Omit<Books, "id"> ): Promise<Books> 
{
        const result = await db<Books[]>`
            INSERT INTO books (
                isbn, 
                author_id,
                title,
                year,
                description,
                genre
            ) VALUES (
                ${book.isbn},
                ${book.author_id},
                ${book.title},
                ${book.year},
                ${book.description},
                ${book.genre}
            ) RETURNING *
        `
        const newBook = result[0]
        if(!newBook) {
            throw new InternalError("Failed to insert book")
        }
        return newBook
}


export async function updateBook(id: string, updateData: Partial<Omit<Books, "id">>) {
  const result = await db<Books[]> `
    UPDATE books
    SET ${db(updateData)}
    WHERE id = ${id}
    RETURNING *
  `
  const updatedBook = result[0]
  if(!updatedBook) {
    throw new NotFound("Book not found")
  }
  return updatedBook
}

export async function deleteBook(id: string): Promise<void> {
    const result = await db`
      DELETE FROM books WHERE id = ${id}
    `
    if(result.count === 0) {
      throw new NotFound("Book not found, nothing was deleted")
    }
}