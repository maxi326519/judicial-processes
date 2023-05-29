export interface IFrames {
  id?: "";
  name: string;
  data: string;
}

export interface ErrorIFrames {
  name: string;
  data: string;
}

export const initIFrames: IFrames = {
  name: "",
  data: "",
};

export const initErrorIFrames: ErrorIFrames = {
  name: "",
  data: "",
};
