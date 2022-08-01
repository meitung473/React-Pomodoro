import {
    SET_TIMER,
    SWITCH_TIMER,
    FINISH_TIMEROUND,
    SET_CURRENTONTASKID,
    UPDATE_TIMERTOMATONUM,
    SET_TIMERTOMATONUM,
    UPDATE_CURRENTTIME,
} from "./actionType";

export function setTimermode(mode) {
    return {
        type: SET_TIMER,
        payload: mode,
    };
}

export function switchTimerONOFF(onoff) {
    return {
        type: SWITCH_TIMER,
        payload: onoff,
    };
}
export function finishtimeround(mode) {
    return {
        type: FINISH_TIMEROUND,
        payload: mode,
    };
}
//目前追蹤的 task id
export function setcurrentOnTaskId(id) {
    return {
        type: SET_CURRENTONTASKID,
        payload: id,
    };
}

//更新計時器番茄數
export function setTomatoNum(tomato) {
    return {
        type: SET_TIMERTOMATONUM,
        payload: tomato,
    };
}
//更新番茄數
export function updateTomatoNum(mode) {
    return {
        type: UPDATE_TIMERTOMATONUM,
        payload: mode,
    };
}
export function updatecurrentTime(currentTime) {
    return {
        type: UPDATE_CURRENTTIME,
        payload: currentTime,
    };
}
//
