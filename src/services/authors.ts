import repository from "../repository";
import type { Author } from "../types/db";

export async function getAuthors() {
  return await repository.authorRepository.getAuthors();
}

export async function getAuthorsById(id: string) {
  return repository.authorRepository.getAuthorsById(id);
}

export async function insertAuthor(authorData: Omit<Author, "id">) {
  return await repository.authorRepository.insertAuthor(authorData);
}

export async function updateAuthor(id: string, data: Partial<Omit<Author, "id">>) {
  const updatedAuthor = await repository.authorRepository.updateAuthor(
    id,
    data
  );
 
  return updatedAuthor;
}

export async function deleteAuthor(id: string) {
  await repository.authorRepository.deleteAuthor(id);
  return { message: "Author deleted" };
}
