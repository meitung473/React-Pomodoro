import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectorAlarm, selectorTimer } from "@redux/selector";
import { br } from "@constants/device";
import useInterval from "@Hooks/useInterval";
import { CIRCLEFACE } from "@constants/constants";
import { ModalProvider } from "@components/Modal/ModalcontextPackage";
import TimerButtons from "./TimerButtons";
import { nextRound, updateCurrentTime } from "@redux/reducers/timer/slice";
import { useEffect, useState } from "react";
import Clock from "./Clock";
import TomatoCount from "./TomatoCount";

const TimerContainer = styled.main`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`;

const TimerControll = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    max-width: 400px;
    ${br.md} {
        max-width: 500px;
    }
`;

const Timer = ({ setTimesupPlay, setCurrentPlay }) => {
    const {
        timermode,
        currentOnTaskId,
        cachecurrentTime,
        timerstatus,
        timertomatonum,
    } = useSelector(selectorTimer);
    const dispatch = useDispatch();
    const alarm = useSelector(selectorAlarm);
    const [currentLine, setCurrentLine] = useState(CIRCLEFACE);

    /**
     * 切換模式 與 換專注的 taskId 都要復原
     */
    useEffect(() => {
        setCurrentLine(CIRCLEFACE);
    }, [timermode, currentOnTaskId, setTimesupPlay]);

    useInterval(
        () => {
            if (cachecurrentTime <= 0) {
                if (alarm.hadAlarm) {
                    setTimesupPlay(alarm.type[timermode]);
                    setCurrentPlay(null);
                }
                dispatch(nextRound());
                return;
            }
            setCurrentLine((prev) => {
                return prev - prev / cachecurrentTime;
            });
            dispatch(updateCurrentTime());
        },
        timerstatus ? 1000 : null
    );

    return (
        <TimerContainer>
            <TimerControll>
                <Clock currentLine={currentLine} />
                <ModalProvider>
                    <TimerButtons
                        currentOnTaskId={currentOnTaskId}
                        timermode={timermode}
                        timerstatus={timerstatus}
                        timertomatonum={timertomatonum}
                        setTimesupPlay={setTimesupPlay}
                        setCurrentPlay={setCurrentPlay}
                    />
                </ModalProvider>
            </TimerControll>
            <TomatoCount
                fill={
                    currentOnTaskId ? timertomatonum[timermode || "task"] : -1
                }
            />
        </TimerContainer>
    );
};
export default Timer;
