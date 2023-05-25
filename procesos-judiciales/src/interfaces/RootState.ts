import { JudicialProcesses, ProcessesDetails } from "./JudicialProcesses";
import { Users } from "./users";

export interface RootState {
  user: Users;
  users: Users[];
  processes: {
    judicialProcesses: JudicialProcesses[];
    processesDetails: ProcessesDetails;
  };
  lists: {
    Departamentos: [];
    Ciudades: [];
    Zonas: [];

    TipoDeActuación: [];
    JurisdicciónAcción: [];
    Pretensiones: [];
    Calificaciones: [];
    Etapas: [];
    DetallesEtapaAnterior: [];
    Instancia: [];
    TipoFallos: [];
    FormasTerminación: [];
    LlamamientoGarantía: [];
    Estados: [];
    Festivos: [];
    SalariosMínimos: [];
  };
  graphics: {};
  iframes: [];
}
