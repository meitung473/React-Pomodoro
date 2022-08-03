import { combineReducers } from "redux";
import todoReducer from "./todo/slice";
import chartReducer from "./chart/slice";
// import { todoReducer as todos } from "./todo";
// import { timerReducer as timer } from "./timer";
import { alarmReducer as alarm } from "./alarm";
// import { chartReducer as chart } from "./chart";
import timerReducer from "./timer/slice";

export default combineReducers({
    todos: todoReducer,
    timer: timerReducer,
    alarm,
    chart: chartReducer,
});
