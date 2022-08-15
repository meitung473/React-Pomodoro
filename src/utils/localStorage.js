export const loadState = () => {
    try {
        const serializedState = window.localStorage.getItem("persistantState");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.warn(err);
        return undefined;
    }
};

export const saveState = (state) => {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    } catch (err) {
        console.warn(err);
    }
};
