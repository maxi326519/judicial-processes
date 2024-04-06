import { requirementsReducer } from "./RequirementsReducer/index";
import { processesReducer } from "./ProcessesReducer";
import { combineReducers } from "redux";
import { tutelasReducer } from "./TutelasReducer/indes";
import { poderesReducer } from "./PoderesReducer/indes";
import { historyReducer } from "./HistoryReducer";
import { loadingReducer } from "./LoadingReducer";
import { sesionReducer } from "./SesionReducer";
import { usersReducer } from "./UsersReducer";
import { configReducer } from "./ConfigReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  sesion: sesionReducer,
  users: usersReducer,
  processes: processesReducer,
  tutelas: tutelasReducer,
  requirements: requirementsReducer,
  poderes: poderesReducer,
  config: configReducer,
  history: historyReducer,
});

export default rootReducer;
