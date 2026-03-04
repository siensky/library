export const createBookSchema = {
  body: {
    type: "object",
    required: ["isbn", "author_id", "title", "year"],
    properties: {
      isbn: { type: "string", minLength: 10 },
      author_id: { type: "string", format: "uuid" },
      title: { type: "string" },
      year: { type: "number", minimum: 1000, maximum: 2026 },
      description: { type: "string" },
      genre: { type: "string" },
    },
    additionalProperties: false,
  },
} ;
