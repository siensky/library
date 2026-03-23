# Library Backend API

This project is a backend API for a library system built using Bun and PostgreSQL. It provides functionality for managing books, authors, and loans, along with authentication and role-based access control.

The API allows users to borrow and return books, while administrators can manage the library catalog through full CRUD operations.

## Tech Stack

- Bun
- PostgreSQL
- Auth0
- Helmet 
- CORS
- Rate Limiting
- Postman (testing)

## Features

- Full CRUD for books (create, read, update, delete)
- Full CRUD for authors (create, read, update, delete)
- Borrow and return books
- Loan tracking system
- Role-based access control (Admin / User)
- Public access to view books and authors
- Secure API using Helmet, CORS, and rate limiting

## User Roles

### Public
- Can view all books and authors

### User (authenticated)
- Can borrow books (maximum of 5 active loans)
- Can return borrowed books

### Admin
- Full CRUD access to books and authors
- Can manage the library catalog

## Architecture

The project follows the Repository Pattern to separate concerns and keep the codebase modular and maintainable. This structure separates database logic from business logic, making the application easier to scale and test.

## Database

The application uses PostgreSQL with the following main entities:

- Books
- Authors
- Loans

Relationships:
- Each book is linked to an author
- Each loan links a book to a user (via Auth0 `sub`)

## Live api

https://library-production-911d.up.railway.app/


Public endpoints:

- /health
- /books
- /authors

## Getting Started

Clone the repository:

```bash
git clone https://github.com/siensky/library.git
cd library


