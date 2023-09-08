export interface User {
  id?: string;
  rol: UserRol;
  name: string;
  email: string;
  password: string;
}

export enum UserRol {
  ADMIN = "ADMIN",
  USER = "USER",
}
