/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.sql(`
    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    CREATE TABLE users (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      auth0_sub text NOT NULL UNIQUE,
      email text NOT NULL UNIQUE,
      username text NOT NULL UNIQUE,
      is_admin boolean NOT NULL DEFAULT false
    );

    CREATE TABLE authors (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      name text NOT NULL,
      description text
    );
      
    CREATE TABLE books (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      isbn text NOT NULL,
      author_id uuid NOT NULL REFERENCES authors(id) ON DELETE RESTRICT,
      title text NOT NULL,
      year int,
      description text,
      genre text
    );

    CREATE TABLE loans (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      book_id uuid NOT NULL REFERENCES books(id) ON DELETE RESTRICT,
      user_id uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
      loaned_at timestamptz NOT NULL DEFAULT now(),
      due_at timestamptz NOT NULL,
      returned_at timestamptz
    );

    CREATE INDEX books_author_id_idx ON books(author_id);
    CREATE INDEX books_isbn_idx ON books(isbn);
    CREATE INDEX books_title_idx ON books(title);

    CREATE INDEX loans_user_id_idx ON loans(user_id);

    CREATE UNIQUE INDEX loans_one_active_per_book_idx
      ON loans(book_id)
      WHERE returned_at IS NULL;
    `)

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
    DROP INDEX IF EXISTS loans_one_active_per_book_idx;
    DROP INDEX IF EXISTS loans_user_id_idx;

    DROP INDEX IF EXISTS books_title_idx;
    DROP INDEX IF EXISTS books_isbn_idx;
    DROP INDEX IF EXISTS books_author_id_idx;

    DROP TABLE IF EXISTS loans;
    DROP TABLE IF EXISTS books;
    DROP TABLE IF EXISTS authors;
    DROP TABLE IF EXISTS users;

    `)
};
