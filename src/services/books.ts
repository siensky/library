import { httpError } from "../error/httpError";
import repository from "../repository";
import type { Books } from "../types/db";

export async function getBookById(id: string): Promise<Books | null> {
 
  return repository.booksRepository.getBookById(id)

}
