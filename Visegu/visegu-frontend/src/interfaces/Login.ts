export interface LoginData {
  email: string;
  password: string;
}

export interface LoginError {
  email: string;
  password: string;
}

export const initLogin = (): LoginData => ({
  email: "",
  password: "",
});

export const initLoginError = (): LoginError => ({
  email: "",
  password: "",
});
