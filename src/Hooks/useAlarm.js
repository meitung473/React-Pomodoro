import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectorAlarm, selectorTimer } from "@redux/selector";

import { toggleAlarm } from "@redux/reducers/alarm";
import audiopackage from "../data/sound.json";

function useAlarm() {
    const dispatch = useDispatch();
    const alarm = useSelector(selectorAlarm);
    const timer = useSelector(selectorTimer);
    const audioref = useRef();

    const Playalarm = () => {
        audioref.current.src =
            process.env.PUBLIC_URL +
            audiopackage.find((_, i) => i === alarm.alarmType[timer.timermode])
                .path;
        dispatch(toggleAlarm(true));
        if (alarm.HasAlarm) {
            audioref.current.play();
        }
    };
    useEffect(() => {
        if (!alarm.HasAlarm) {
            audioref.current.src = null;
        }
    }, [alarm.HasAlarm]);
    return {
        Playalarm,
        audioref,
    };
}

export default useAlarm;
