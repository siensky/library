const bookProperties = {
  isbn: { type: "string", minLength: 10 },
  author_id: { type: "string", format: "uuid" },
  title: { type: "string" },
  year: { type: "number", minimum: 1000, maximum: 2026 },
  description: { type: "string" },
  genre: { type: "string" },
};

export const createBookSchema = {
  body: {
    type: "object",
    required: ["isbn", "author_id", "title", "year"],
    properties: bookProperties,
    additionalProperties: false,
  },
};

export const updateBookSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string", format: "uuid" } },
    required: ["id"],
  },
  body: {
    type: "object",
    required: [],
    properties: bookProperties,
    additionalProperties: false,
  },
};

export const createAuthorSchema = {
  body: {
    type: "object",
    required: ["name", "description"],
    properties: {
      name: { type: "string" },
      description: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const updateAuthorSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string", format: "uuid" } },
    required: ["id"],
  },
  body: {
    type: "object",
    required: [],
    properties: {
      name: { type: "string" },
      description: { type: "string" },
    },
    additionalProperties: false,
  },
};

export const createLoanSchema = {
  body: {
    type: "object",
    required: ["book_id"],
    properties: {
      book_id: { type: "string", format: "uuid" },
    },
    additionalProperties: false,
  },
};

export const returnBookSchema = {
  params: {
    type: "object",
    properties: { id: { type: "string", format: "uuid" } },
    required: ["id"],
  },
};
