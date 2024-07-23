export interface System {
  logo: {
    url: string;
    name: string;
  };
}

export const initSystem = (): System => ({
  logo: {
    url: "",
    name: "",
  },
});
