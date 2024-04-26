export interface ConciliacionesList {
  medioControl: string[];
  pretension: string[];
  desicionComite: string[];
  estadoAudiencia: string[];
  procuraduriaRemitente: string[];
}

export const initConciliacionesList = (): ConciliacionesList => ({
  medioControl: [],
  pretension: [],
  desicionComite: [],
  estadoAudiencia: [],
  procuraduriaRemitente: [],
});
