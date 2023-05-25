export interface Users {
  id: string;
  name: string;
  email: string;
  rol: UserRol;
  password?: string;
}

export enum UserRol {
  Admin = "Admin",
  User = "User",
}

export const initUser = {
  id: "",
  name: "",
  email: "",
  rol: UserRol.User,
  password: "",
}
