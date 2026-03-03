


export type User = {
    id: string
    auth0_sub: string
    email: string
    username: string
    is_admin: boolean

}

export type Books = {
    id: string
    isbn: string
    author_id: string
    title: string
    year: number
    description: string
    genre: string


}


export type Loan = {
    id: string
    book_id: string
    user_id: string
    loaned_at: Date
    due_at: Date
    returned_at: Date | null
   


}

export type Author = {
    id: string
    name: string
    description: string


}

