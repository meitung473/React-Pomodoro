import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ReactComponent as NextTaskIcon } from "@images/TimerNextTask.svg";
import { ReactComponent as PauseIcon } from "@images/TimerPause.svg";
import { ReactComponent as PlayIcon } from "@images/TimerPlay.svg";
import { ReactComponent as CancelIcon } from "@images/Cancel.svg";
import { TASKMODE, MODETIME } from "@constants/constants";
import { selectorTimer } from "@redux/selector";
import { Modal, useModal } from "@components/Modal/ModalcontextPackage";
import {
    SKIPMODAL,
    CANCELMODAL,
    WARN_NONTASKCANCEL,
    WARN_STARTMODAL,
    WARN_NONSKIP,
    FINISHMODAL,
} from "@components/Modal/ModalType";
import { switchTimerONOFF } from "@reducers/timer";
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

export default function TimerButtons() {
    const timer = useSelector(selectorTimer);
    const { setModalName } = useModal();
    const dispatch = useDispatch();
    const PlayHandler = (boolean) => () => {
        /**
         * no task not yet
         */
        if (!timer.currentOnTaskId) {
            setModalName(WARN_STARTMODAL);

            return;
        }
        if (timer.timertomatonum.rest <= 0) {
            setModalName(FINISHMODAL);
            return;
        }
        dispatch(switchTimerONOFF(boolean));

        // audioref.current.src = null;
    };

    return (
        <ButtonGroup $mode={timer?.timermode || TASKMODE}>
            <CancelIcon
                onClick={() => {
                    if (!timer.currentOnTaskId) {
                        setModalName(WARN_NONTASKCANCEL);
                        return;
                    }
                    setModalName(CANCELMODAL);
                }}
            />
            {timer.timerstatus ? (
                <PauseIcon onClick={PlayHandler(false)} />
            ) : (
                <PlayIcon onClick={PlayHandler(true)} />
            )}
            <NextTaskIcon
                onClick={() => {
                    if (
                        !timer.currentOnTaskId ||
                        timer.timertomatonum.rest <= 0
                    ) {
                        setModalName(WARN_NONSKIP);
                        return;
                    }
                    setModalName(SKIPMODAL);
                }}
            />
            <Modal />
        </ButtonGroup>
    );
}
