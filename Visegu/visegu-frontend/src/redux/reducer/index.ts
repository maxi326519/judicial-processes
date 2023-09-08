import { combineReducers } from "redux";
import { historyReducer } from "./HistoryReducer";
import { loadingReducer } from "./LoadingReducer";
import { productReducer } from "./ProductReducer";
import { stockReducer } from "./StockReducer";
import { storageReducer } from "./StorageReducer";
import { usersReducer } from "./UsersReducer";

const rootReducer = combineReducers({
  loading: loadingReducer,
  login: loadingReducer,
  users: usersReducer,
  products: productReducer,
  stock: stockReducer,
  storage: storageReducer,
  history: historyReducer,
});

export default rootReducer;
