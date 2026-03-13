import type { Books, Loan, User } from "./db";

export type BookWithAuthor = Books & {
  author_name: string;
};

export type UserData = Omit<User, "id" | "is_admin">;

export type CreateUser = Omit<User, "id">;


export type LoanWithBookTitle = Loan & {
    book_title: string
  }