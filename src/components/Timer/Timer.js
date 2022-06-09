import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";

import { selectorTimer } from "@redux/selector";
import { updateChart } from "@reducers/chart";
import { switchTimerONOFF } from "@reducers/timer";

import { ModalContext, TimerContext } from "@constants/context";
import { br } from "@constants/device";

import { dataTypes } from "@pages/AnalysisPage/type";
import useInterval from "@Hooks/useInterval";
import useAlarm from "@Hooks/useAlarm";

import { TomatoCount, Clock } from "@components";
import { ReactComponent as NextTaskIcon } from "@images/TimerNextTask.svg";
import { ReactComponent as PauseIcon } from "@images/TimerPause.svg";
import { ReactComponent as PlayIcon } from "@images/TimerPlay.svg";
import { ReactComponent as CancelIcon } from "@images/Cancel.svg";
import {
    SKIPMODAL,
    CANCELMODAL,
    WARN_NONTASKCANCEL,
    WARN_STARTMODAL,
    WARN_NONSKIP,
    FINISHMODAL,
} from "@components/Modal/ModalType";
import { TASKMODE, MODETIME } from "@constants/constants";
import { toggleAlarm } from "@redux/reducers/alarm";

const TimerContainer = styled.main`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`;
const ButtonGroup = styled.div`
    box-sizing: border-box;
    padding: 8px 20px;
    background-color: ${({ $mode, theme }) =>
        $mode === TASKMODE ? theme.primary.Default : theme.secondary.Default};
    border-radius: 10px;
    svg {
        flex-basis: 100px;
        flex-grow: 1;
        height: 32px;
        margin: 0 15px;
        box-sizing: border-box;
        cursor: pointer;
    }
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

    const { openModal } = useContext(ModalContext);
    const {
        currenttime,
        setCurrentTime,
        currentLine,
        setCurrentLine,
        nextRound,
    } = useContext(TimerContext);

    const { Playalarm, audioref } = useAlarm();

    const handleClick = (boolean) => () => {
        if (!timer.currentOnTaskId) {
            openModal(WARN_STARTMODAL);
            return;
        }
        if (timer.timertomatonum.rest <= 0) {
            openModal(FINISHMODAL);
            return;
        }
        dispatch(switchTimerONOFF(boolean));
        audioref.current.src = null;
    };

    useInterval(
        () => {
            if (currenttime <= 0) {
                // 算入 task 時間
                if (timer.timermode === TASKMODE) {
                    // 這裡是定值，
                    let min2hr =
                        Math.round((MODETIME[TASKMODE] / 60) * 100) / 100;
                    dispatch(updateChart(dataTypes.tomatoNum, 1));
                    dispatch(updateChart(dataTypes.focusTime, min2hr));
                }

                dispatch(switchTimerONOFF(false));
                Playalarm();
                nextRound();
                return;
            }
            setCurrentTime((prev) => prev - 1);
            setCurrentLine((prev) => prev - prev / currenttime);
        },
        timer.timerstatus ? 1000 : null
    );
    useEffect(() => {
        if (!audioref.current.src) {
            dispatch(toggleAlarm(false));
        }
    }, [audioref, dispatch]);
    return (
        <TimerContainer>
            <TimerControll>
                <Clock currentLine={currentLine} />
                <ButtonGroup $mode={timer?.timermode || TASKMODE}>
                    <CancelIcon
                        onClick={() => {
                            if (!timer.currentOnTaskId) {
                                openModal(WARN_NONTASKCANCEL);
                                return;
                            }
                            openModal(CANCELMODAL);
                        }}
                    />
                    {timer.timerstatus ? (
                        <PauseIcon onClick={handleClick(false)} />
                    ) : (
                        <PlayIcon onClick={handleClick(true)} />
                    )}
                    <NextTaskIcon
                        onClick={() => {
                            if (
                                !timer.currentOnTaskId ||
                                timer.timertomatonum.rest <= 0
                            ) {
                                openModal(WARN_NONSKIP);
                                return;
                            }
                            openModal(SKIPMODAL);
                        }}
                    />
                </ButtonGroup>
            </TimerControll>
            <TomatoCount
                fill={
                    timer.currentOnTaskId
                        ? timer.timertomatonum[timer?.timermode || "task"]
                        : -1
                }
            />

            <audio
                ref={audioref}
                onEnded={() => dispatch(toggleAlarm(false))}
            />
        </TimerContainer>
    );
};
export default Timer;
