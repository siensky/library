export type TokenPayload = {
    "https://library.com/role"?: "user" | "admin"
    sub: string;
    type: "access" | "refresh";
    email: string;
    display_name: string;
    iat: number;
    exp: number;
  };