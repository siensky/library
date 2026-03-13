import { InternalError, NotFound } from "../error/error";
import type { Loan } from "../types/db";
import type { LoanWithBookTitle } from "../types/public";
import db from "./db";

export async function getLoans(): Promise<Loan[]> {
  return await db<Loan[]>`SELECT * FROM loans ORDER BY loaned_at DESC`;
}

export async function getLoansBySub(
  auth0Sub: string
): Promise<LoanWithBookTitle[]> {
  return await db<LoanWithBookTitle[]>`
        SELECT l.*, b.title as book_title
        FROM loans l
        JOIN books b ON l.book_id = b.id
        WHERE l.auth0_sub = ${auth0Sub}
        ORDER BY l.loaned_at DESC
        `;
}

export async function getActiveLoansCount(auth0Sub: string): Promise<number> {
  const result = await db`
        SELECT count(*) FROM loans
        WHERE auth0_sub = ${auth0Sub} AND returned_at IS NULL
    `;
  const countValue = result?.[0]?.count;
  return countValue ? parseInt(countValue) : 0;
}

export async function getTimeRemaining(bookId: string): Promise<string | null> {
  const result = await db`
        SELECT (due_at - now()) as time_left
        FROM loans
        WHERE book_id = ${bookId} AND returned_at IS NULL
    `;
  return result[0]?.time_left ?? null;
}

export async function createLoan(
  bookId: string,
  auth0Sub: string
): Promise<Loan> {
  const result = await db<Loan[]>`
    INSERT INTO loans (
        book_id,
        auth0_sub,
        due_at
    ) VALUES (
        ${bookId},
        ${auth0Sub},
        now() + interval '20 days'
    ) RETURNING *
    `;
  const newLoan = result[0];
  if (!newLoan) {
    throw new InternalError("Failed to create loan");
  }
  return newLoan;
}

export async function returnBook(
  loanId: string,
  auth0Sub: string
): Promise<Loan> {
  const result = await db<Loan[]>`
    UPDATE loans
    SET returned_at = now()
    WHERE id = ${loanId}
    AND auth0_sub = ${auth0Sub}
    AND returned_at IS NULL 
    RETURNING *    
    `;

    const loan = result[0]
  if (!loan) {
    throw new NotFound("Loan not found or already returned");
  }
  return loan;
}
