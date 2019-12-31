import { createStore, applyMiddleware } from "redux";
// redux caches data in local storage
import { persistStore } from "redux-persist";
import logger from "redux-logger";

import rootReducer from "./root-reducer";

// arry of middlewares
const middleWares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middleWares));

// persisted version of store
export const persistor = persistStore(store);

export default store;
