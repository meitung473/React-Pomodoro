import { combineReducers } from "redux";
import { todoReducer as todos } from "./todo";
import { timerReducer as timer } from "./timer";
import { alarmReducer as alarm } from "./alarm";
import { chartReducer as chart } from "./chart";

export default combineReducers({
    todos,
    timer,
    alarm,
    chart,
});
