import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { selectorTimer } from "@redux/selector";

import { br } from "@constants/device";

import useInterval from "@Hooks/useInterval";
import useAlarm from "@Hooks/useAlarm";

import { TomatoCount, Clock } from "@components";

import { CIRCLEFACE } from "@constants/constants";

import { ModalProvider } from "@components/Modal/ModalcontextPackage";
import TimerButtons from "./TimerButtons";
import { nextRound, updateCurrentTime } from "@redux/reducers/timer/slice";
import { useEffect, useState } from "react";

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
const Timer = () => {
    const timer = useSelector(selectorTimer);
    const dispatch = useDispatch();
    const { Playalarm, audioref } = useAlarm();
    const [currentLine, setCurrentLine] = useState(CIRCLEFACE);
    // useEffect(() => {
    //     if (!audioref.current.src) {
    //         dispatch(toggleAlarm(false));
    //     }
    // }, [audioref, dispatch]);
    useEffect(() => {
        setCurrentLine(CIRCLEFACE);
    }, [timer.timermode]);
    useInterval(
        () => {
            if (timer.cachecurrentTime <= 0) {
                setCurrentLine(CIRCLEFACE);
                dispatch(nextRound());
                // Playalarm();
                return;
            }
            setCurrentLine((prev) => {
                return prev - prev / timer.cachecurrentTime;
            });
            dispatch(updateCurrentTime());
        },
        timer.timerstatus ? 1000 : null
    );

    return (
        <TimerContainer>
            <TimerControll>
                <Clock currentLine={currentLine} />
                <ModalProvider>
                    <TimerButtons
                        currentOnTaskId={timer.currentOnTaskId}
                        timermode={timer.timermode}
                        timerstatus={timer.timerstatus}
                        timertomatonum={timer.timertomatonum}
                    />
                </ModalProvider>
            </TimerControll>
            <TomatoCount
                fill={
                    timer.currentOnTaskId
                        ? timer.timertomatonum[timer?.timermode || "task"]
                        : -1
                }
            />

            {/* <audio
                ref={audioref}
                onEnded={() => dispatch(toggleAlarm(false))}
            /> */}
        </TimerContainer>
    );
};
export default Timer;
