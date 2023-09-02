export interface RequirementsLists {
  remitenteGeneral: string[];
  remitenteEspecifico: string[];
  tipoProceso: string[];
  areaApoyo: string[];
  estado: string[];
}

export const initRequirementsLists = (): RequirementsLists => ({
  remitenteGeneral: [],
  remitenteEspecifico: [],
  tipoProceso: [],
  areaApoyo: [],
  estado: [],
});
