export interface PoderesList {
  abogado: string[];
  concepto: string[];
  proceso: string[];
}

export const initPoderesList = (): PoderesList => ({
  abogado: [],
  concepto: [],
  proceso: [],
});
