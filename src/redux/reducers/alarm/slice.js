import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: {
        task: 0,
        rest: 0,
    },
    hadAlarm: true,
};

const alarmSlice = createSlice({
    name: "alarm",
    initialState,
    reducers: {
        setupType: {
            reducer: (state, action) => {
                const { mode, index } = action.payload;
                state.type[mode] = index;
            },
            prepare: (mode, index) => {
                return {
                    payload: { mode, index },
                };
            },
        },
        toggleStatus: {
            reducer: (state) => {
                state.hadAlarm = !state.hadAlarm;
            },
        },
    },
    extraReducers: {},
});
export const { setupType, toggleStatus } = alarmSlice.actions;
export default alarmSlice.reducer;
