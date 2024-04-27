export interface Users {
  id?: string;
  name: string;
  email: string;
  rol: UserRol;
  password?: string;
  available?: {
    startDate: Date | null;
    endDate: Date | null;
  };
  permissions: {
    processes: boolean;
    tutelas: boolean;
    requirements: boolean;
    poderes: boolean;
    conciliaciones: boolean;
  };
}

export enum UserRol {
  Admin = "Admin",
  User = "User",
  Any = "",
}

export enum UserPermissions {
  Admin = "Admin",
  Processes = "processes",
  Tutelas = "tutelas",
  Requirements = "requirements",
  Any = "Any",
}

export interface ErrorUser {
  rol: string;
  name: string;
  email: string;
  password?: string;
}

export const initUser = (): Users => ({
  name: "",
  email: "",
  rol: UserRol.User,
  password: "",
  permissions: {
    processes: false,
    tutelas: false,
    requirements: false,
    poderes: false,
    conciliaciones: false,
  },
});

export const initErrorUser = (): ErrorUser => ({
  rol: "",
  name: "",
  email: "",
  password: "",
});
