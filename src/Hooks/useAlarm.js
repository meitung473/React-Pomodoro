import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectorAlarm, selectorTimer } from "@redux/selector";

import { toggleAlarm } from "@redux/reducers/alarm";
import audiopackage from "../data/sound.json";

function useAlarm() {
    const dispatch = useDispatch();
    const alarmdata = useSelector(selectorAlarm);
    const timer = useSelector(selectorTimer);
    const audioref = useRef();

    // 播放
    const Playalarm = () => {
        audioref.current.src = audiopackage.find(
            (_, i) => i === alarmdata.alarmType[timer.timermode]
        ).path;
        dispatch(toggleAlarm(true));
        audioref.current.play();
    };

    return {
        Playalarm,
        audioref,
    };
}

export default useAlarm;
