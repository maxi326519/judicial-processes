export interface Users {
  id?: string;
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
  name: "",
  email: "",
  rol: UserRol.User,
  password: "",
};

export interface ErrorUser {
  name: string;
  email: string;
  password?: string;
}

export const initErrorUser: ErrorUser = {
  name: "",
  email: "",
  password: "",
};
