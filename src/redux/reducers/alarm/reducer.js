import { SET_ALARM, TOGGLE_ALARM, HAS_ALARM } from "./actionType";

const initalState = {
    alarmType: {
        task: 0,
        rest: 0,
    },
    alarmrang: false,
    HasAlarm: true,
};
export default function alarmReducer(state = initalState, action) {
    switch (action.type) {
        case SET_ALARM:
            return {
                ...state,
                alarmType: {
                    ...state.alarmType,
                    [action.payload.group]: action.payload.id,
                },
            };
        case TOGGLE_ALARM:
            return {
                ...state,
                alarmrang: action.payload,
            };
        case HAS_ALARM:
            return {
                ...state,
                HasAlarm: action.payload,
            };
        default:
            return state;
    }
}
