import {
    SET_TIMER,
    SWITCH_TIMER,
    SET_CURRENTONTASKID,
    SET_TIMERTOMATONUM,
    UPDATE_TIMERTOMATONUM,
    RESET_TIMER,
    UPDATE_CURRENTTIME,
} from "./actionType";

const initalState = {
    timermode: null,
    timerstatus: false,
    timertomatonum: {
        task: 0,
        rest: 0,
    },
    currentOnTaskId: null,
    cachecurrentTime: null,
};
export default function timerReducer(state = initalState, action) {
    switch (action.type) {
        case SET_TIMER:
            return {
                ...state,
                timermode: action.payload,
            };
        case SWITCH_TIMER:
            return {
                ...state,
                timerstatus: action.payload,
            };
        case SET_CURRENTONTASKID:
            return {
                ...state,
                currentOnTaskId: action.payload,
            };
        case UPDATE_TIMERTOMATONUM:
            return {
                ...state,
                timertomatonum: {
                    ...state.timertomatonum,
                    [action.payload]: state.timertomatonum[action.payload] - 1,
                },
            };
        case SET_TIMERTOMATONUM:
            return {
                ...state,
                timertomatonum: action.payload,
            };
        case RESET_TIMER:
            return {
                ...state,
                timermode: null,
                timerstatus: false,
                timertomatonum: {
                    task: 0,
                    rest: 0,
                },
                currentOnTaskId: null,
            };
        case UPDATE_CURRENTTIME:
            return {
                ...state,
                cachecurrentTime: action.payload,
            };
        default:
            return state;
    }
}
