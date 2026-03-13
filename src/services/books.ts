
import repository from "../repository";
import type { Books } from "../types/db";
import type { BookWithAuthor } from "../types/public";

export async function getBooks() {
    return await repository.booksRepository.getBooks()

}

export async function getBookById(id: string): Promise<BookWithAuthor | null> {
 
  return repository.booksRepository.getBookById(id)

}

export async function insertBook(bookData: Omit<Books, "id">) {
   
        return await repository.booksRepository.insertBook(bookData)
   
    }



export async function updateBook(id: string, data: Partial<Omit<Books, "id">>) {
    const updatedBook = await repository.booksRepository.updateBook(id, data)
    return updatedBook
}

export async function deleteBook(id: string) {
    await repository.booksRepository.deleteBook(id)
    return {message: "Book deleted"}
}