import type { Books } from "../types/db";
import db from "./db";

export async function getBookById(id: string): Promise<Books | null> {
  const result = await db<Books[]>`
    SELECT id, isbn, author_id, title, year, 
    description, genre
     FROM books WHERE id = ${id}
    `;

  return result[0] ?? null;
}
