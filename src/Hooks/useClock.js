import { CIRCLEFACE, TASKMODE, MODETIME } from "@constants/constants";
import { updatecurrentTime } from "@redux/reducers/timer/action";
import { selectorTimer } from "@redux/selector";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    setTimermode,
    setcurrentOnTaskId,
    switchTimerONOFF,
    updateTomatoNum,
} from "../redux/reducers/timer";

function useClock() {
    const dispatch = useDispatch();
    const timer = useSelector(selectorTimer);

    const [currenttime, setCurrentTime] = useState(
        timer?.cachecurrentTime
            ? timer.cachecurrentTime
            : MODETIME[timer?.timermode || TASKMODE]
    );
    const [currentLine, setCurrentLine] = useState(
        (CIRCLEFACE *
            (timer?.cachecurrentTime ||
                MODETIME[timer?.timermode || TASKMODE])) /
            MODETIME[timer?.timermode || TASKMODE]
    );

    const nextRound = () => {
        const nextModeTime = Object.keys(MODETIME).find((mode) => {
            return mode !== timer.timermode;
        });

        dispatch(setTimermode(nextModeTime));
        dispatch(updateTomatoNum(timer.timermode));
        setCurrentLine(CIRCLEFACE);
        setCurrentTime(MODETIME[nextModeTime]);
    };

    const initialTimer = (id) => {
        dispatch(setcurrentOnTaskId(id));
        dispatch(setTimermode(TASKMODE));
        dispatch(switchTimerONOFF(false));
        setCurrentTime(MODETIME[TASKMODE]);
        setCurrentLine(CIRCLEFACE);
    };

    useEffect(() => {
        dispatch(updatecurrentTime(currenttime));
    }, [currenttime, dispatch]);

    return {
        currenttime,
        setCurrentTime,
        currentLine,
        setCurrentLine,
        nextRound,
        initialTimer,
    };
}
export default useClock;
