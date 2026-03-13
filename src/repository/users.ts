import { InternalError } from "../error/error";
import type { User } from "../types/db";
import type { CreateUser, UserData } from "../types/public";
import db from "./db";

export async function getUserBySub(auth0_sub: string): Promise<User | null> {
  const result = await db<
    User[]
  >`SELECT * FROM users WHERE auth0_sub = ${auth0_sub}`;
  return result[0] ?? null;
}

export async function createUser(userData: CreateUser): Promise<User> {
  const result = await db<User[]>`
        INSERT INTO users (auth0_sub, email, username, is_admin)
        VALUES (${userData.auth0_sub}, ${userData.email}, ${userData.username}, ${userData.is_admin})
        RETURNING id, auth0_sub, email, username, is_admin
    `;
  const created = result[0];
  if (!created) {
    throw new InternalError("Failed to create user", { userData });
  }
  return created;
}
