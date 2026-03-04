import type { Books } from "./db"

export type BookWithAuthor = Books & {
    author_name: string
}