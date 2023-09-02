import { /* Action, combineReducers, */ applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk, { /* ThunkMiddleware */ } from "redux-thunk";
import rootReducer from "../reducer";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
