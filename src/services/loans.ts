import { BadRequest, Forbidden } from "../error/error";
import repository from "../repository";
import type { Loan } from "../types/db";

export async function getLoans(): Promise<Loan[]> {
  return await repository.loanRepository.getLoans();
}

export async function getLoansBySub(auth0Sub: string): Promise<Loan[]> {
  return await repository.loanRepository.getLoansBySub(auth0Sub);
}

export async function loanBook(
  bookId: string,
  auth0Sub: string
): Promise<Loan> {
  const activeLoan = await repository.loanRepository.getTimeRemaining(bookId);
  if (activeLoan) {
    throw new BadRequest("This book is already loaned out");
  }

  const activeLoans = await repository.loanRepository.getActiveLoansCount(
    auth0Sub
  );
  if (activeLoans >= 5)
    throw new Forbidden("You cannot borrow more than five books");

  return await repository.loanRepository.createLoan(bookId, auth0Sub);
}

export async function returnBook(loanId: string, auth0Sub: string) {
  return await repository.loanRepository.returnBook(loanId, auth0Sub);
}

export async function getBookTimeRemaining(bookId: string) {
  const timeLeft = await repository.loanRepository.getTimeRemaining(bookId);
  if (!timeLeft) {
    return { message: "Book is currently available" };
  }
  return { time_left: timeLeft };
}
