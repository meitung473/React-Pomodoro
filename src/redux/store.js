import { loadState, saveState } from "../utils/localStorage";
import rootReducer from "./reducers";
import throttle from "lodash/throttle";
import { configureStore } from "@reduxjs/toolkit";

const store = () => {
    const persistantState = loadState();
    const defaultStore = configureStore({
        reducer: rootReducer,
        persistantState,
        devTools: process.env.NODE_ENV !== "production",
    });
    defaultStore.subscribe(
        throttle(() => {
            saveState({
                todos: defaultStore.getState().todos,
                chart: defaultStore.getState().chart,
                alarm: defaultStore.getState().alarm,
                timer: defaultStore.getState().timer,
            });
        }, 1000)
    );
    return defaultStore;
};

// const configStore = () => {
//     const persistantState = loadState();
//     const store = createStore(
//         rootReducer,
//         persistantState,
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//             window.__REDUX_DEVTOOLS_EXTENSION__()
//     );
//     store.subscribe(
//         throttle(() => {
//             saveState({
//                 todos: store.getState().todos,
//                 chart: store.getState().chart,
//                 alarm: store.getState().alarm,
//                 timer: store.getState().timer,
//             });
//         }, 1000)
//     );
//     return store;
// };

// export default configStore;
export default store;
