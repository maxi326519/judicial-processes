export interface ConciliacionesList {
  medioControl: string[];
  pretension: string[];
  decisionComite: string[];
  estadoAudiencia: string[];
  estadoSolicitud: string[];
  procuraduriaRemitente: string[];
}

export const initConciliacionesList = (): ConciliacionesList => ({
  medioControl: [],
  pretension: [],
  decisionComite: [],
  estadoAudiencia: [],
  estadoSolicitud: [],
  procuraduriaRemitente: [],
});
