import { combineReducers } from "redux";
import { loadingReducer } from "./LoadingReducer";
import { sesionReducer } from "./SesionReducer";
import { usersReducer } from "./UsersReducer";
import { processesReducer } from "./ProcessesReducer";
import { tutelasReducer } from "./TutelasReducer/indes";
import { requirementsReducer } from "./RequirementsReducer/index";
import { configReducer } from "./ConfigReducer";
import { poderesReducer } from "./PoderesReducer/indes";

const rootReducer = combineReducers({
  loading: loadingReducer,
  sesion: sesionReducer,
  users: usersReducer,
  processes: processesReducer,
  tutelas: tutelasReducer,
  requirements: requirementsReducer,
  poderes: poderesReducer,
  config: configReducer,
});

export default rootReducer;
