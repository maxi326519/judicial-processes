export interface PoderesList {
  concepto: string[];
  proceso: string[];
}

export const initPoderesList = (): PoderesList => ({
  concepto: [],
  proceso: [],
});
