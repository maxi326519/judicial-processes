import { combineReducers } from "redux";
import { loadingReducer } from "./LoadingReducer";
import { sesionReducer } from "./SesionReducer";
import { usersReducer } from "./UsersReducer";
import { processesReducer } from "./ProcessesReducer";
import { tutelasReducer } from "./TutelasReducer/indes";
import { requirementsReducer } from "./RequirementsReducer/index";

const rootReducer = combineReducers({
  loading: loadingReducer,
  sesion: sesionReducer,
  users: usersReducer,
  processes: processesReducer,
  tutelas: tutelasReducer,
  requirements: requirementsReducer,
});

export default rootReducer;
