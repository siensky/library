import repository from "../repository";
import type { User } from "../types/db";
import type { UserData } from "../types/public";

export async function handleUser(userData: UserData): Promise<User> {
  const user = await repository.userRepository.getUserBySub(userData.auth0_sub);

  if (user) {
    return user;
  }

  return await repository.userRepository.createUser({
    ...userData,
    is_admin: false,
  });
}

export async function getUserBySub(sub: string) {
  return repository.userRepository.getUserBySub(sub);
}
