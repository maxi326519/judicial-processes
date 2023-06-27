export interface Users {
  id?: string;
  name: string;
  email: string;
  rol: UserRol;
  password?: string;
  permissions: {
    processes: boolean;
    tutelas: boolean;
    requirements: boolean;
  };
}

export enum UserRol {
  Admin = "Admin",
  User = "User",
  Any = "",
}

export interface ErrorUser {
  rol: string;
  name: string;
  email: string;
  password?: string;
}

export const initUser: Users = {
  name: "",
  email: "",
  rol: UserRol.User,
  password: "",
  permissions: {
    processes: false,
    tutelas: false,
    requirements: false,
  },
};

export const initErrorUser: ErrorUser = {
  rol: "",
  name: "",
  email: "",
  password: "",
};
