import { createSlice } from "@reduxjs/toolkit";
import { updateChart } from "../chart/slice";
import { dataTypes } from "@pages/AnalysisPage/type";

import { TASKMODE, MODETIME } from "@constants/constants";

const initialState = {
    timermode: null,
    timerstatus: false,
    timertomatonum: {
        task: 0,
        rest: 0,
    },
    currentOnTaskId: null,
    cachecurrentTime: 0,
};

const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        setTimerMode: {
            reducer: (state, action) => {
                state.timermode = action.payload;
            },
            prepare: (mode) => ({ payload: mode }),
        },
        switchTimer: {
            reducer: (state) => {
                // 我不確定，但應該是這樣
                state.timerstatus = !state.timerstatus;
            },
        },
        setCurrentTaskId: {
            reducer: (state, action) => {
                state.currentOnTaskId = action.payload.id;
            },
            prepare: (id = null) => ({ payload: { id } }),
        },
        /**
         * 這在初始化時建構
         */
        initalizeTomatoNum: {
            reducer: (state, action) => {
                state.timertomatonum.task = action.payload;
                state.timertomatonum.rest = action.payload;
            },
            prepare: (tomato) => {
                return { payload: tomato };
            },
        },
        disincrementTomatoNum: {
            reducer: (state, action) => {
                state.timertomatonum[state.timermode]--;
            },
        },
        updateCurrentTime: {
            reducer: (state, action) => {
                if (action.payload) {
                    state.cachecurrentTime = action.payload;
                } else {
                    state.cachecurrentTime--;
                }
            },
            prepare: (time) => ({ payload: time }),
        },
    },
    extraReducers: {},
});

export function initializeTimer(id = null, tomato = 0) {
    return (dispatch, getState) => {
        dispatch(setTimerMode(TASKMODE));
        dispatch(updateCurrentTime(MODETIME[TASKMODE]));
        dispatch(initalizeTomatoNum(tomato));
        dispatch(setCurrentTaskId(id));
        const state = getState();

        if (state.timer.timerstatus) {
            dispatch(switchTimer());
        }
    };
}

export function nextRound() {
    return function (dispatch, getState) {
        const state = getState();
        if (state.timer.timerstatus) {
            dispatch(switchTimer());
        }

        dispatch(disincrementTomatoNum(state.timer.timermode));
        if (state.timer.timermode === TASKMODE) {
            const min2hr = Math.round((MODETIME[TASKMODE] / 60) * 100) / 100;
            dispatch(updateChart(dataTypes.tomatoNum, 1));
            dispatch(updateChart(dataTypes.focusTime, min2hr));
        }
        // 不是很好
        const nextModeTime = Object.keys(state.timer.timertomatonum).filter(
            (mode) => mode !== state.timer.timermode
        )[0];

        dispatch(setTimerMode(nextModeTime));
        dispatch(updateCurrentTime(MODETIME[nextModeTime]));
    };
}

export const {
    setTimerMode,
    switchTimer,
    setCurrentTaskId,
    updateCurrentTime,
    disincrementTomatoNum,
    initalizeTomatoNum,
} = timerSlice.actions;
export default timerSlice.reducer;
