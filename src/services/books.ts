import { Conflict } from "../error/error";
import repository from "../repository";
import type { Books } from "../types/db";

export async function getBooks() {

}

export async function getBookById(id: string): Promise<Books | null> {
 
  return repository.booksRepository.getBookById(id)

}

export async function insertBook(bookData: Omit<Books, "id">) {
    try {
        const newBook = await repository.booksRepository.insertBook(bookData)
        return newBook
    } catch (error: any) {
        if (error.code === "23505"){
            throw new Conflict("There already exists a book with this ISBN")
        }
        throw error
    }
}


export async function updateBook() {

}

export async function deleteBook() {

}