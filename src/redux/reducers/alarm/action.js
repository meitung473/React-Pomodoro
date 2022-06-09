import { SET_ALARM, TOGGLE_ALARM, HAS_ALARM } from "./actionType";

export function setAlarm(group, id) {
    return {
        type: SET_ALARM,
        payload: { group, id },
    };
}
// 鬧聲的聲音開關
export function toggleAlarm(boolean) {
    return {
        type: TOGGLE_ALARM,
        payload: boolean,
    };
}
// 有無鬧鐘
export function hasAlarm(boolean) {
    return {
        type: HAS_ALARM,
        payload: boolean,
    };
}
