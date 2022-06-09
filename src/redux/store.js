import { createStore } from "redux";
import { loadState, saveState } from "../localStorage";
import rootReducer from "./reducers";
import throttle from "lodash/throttle";

const configStore = () => {
    const persistantState = loadState();
    const store = createStore(
        rootReducer,
        persistantState,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    store.subscribe(
        throttle(() => {
            saveState({
                todos: store.getState().todos,
                chart: store.getState().chart,
                alarm: store.getState().alarm,
                timer: store.getState().timer,
            });
        }, 1000)
    );
    return store;
};

export default configStore;
