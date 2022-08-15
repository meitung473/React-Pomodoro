import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ReactComponent as NextTaskIcon } from "@images/TimerNextTask.svg";
import { ReactComponent as PauseIcon } from "@images/TimerPause.svg";
import { ReactComponent as PlayIcon } from "@images/TimerPlay.svg";
import { ReactComponent as CancelIcon } from "@images/Cancel.svg";
import { TASKMODE } from "@constants/constants";
import { Modal, useModal } from "@components/Modal/ModalcontextPackage";
import {
    SKIPMODAL,
    CANCELMODAL,
    FINISHMODAL,
} from "@components/Modal/ModalType";
import { switchTimer } from "@redux/reducers/timer/slice";

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
const showWarnModal = (modalName, boolean) => {
    return boolean ? "warn_" + modalName : modalName;
};

function TimerButtons({
    currentOnTaskId,
    timermode,
    timerstatus,
    timertomatonum,
    setTimesupPlay,
    setCurrentPlay,
}) {
    const { setModalName } = useModal();
    const dispatch = useDispatch();

    const messageHandler = useCallback(
        (modalName, boolean) => () => {
            setModalName(showWarnModal(modalName, boolean));
        },
        []
    );

    const PlayHandler = () => {
        if (!currentOnTaskId) {
            messageHandler(FINISHMODAL, !currentOnTaskId)();
            return;
        }

        if (timertomatonum.rest <= 0) {
            messageHandler(FINISHMODAL, !timertomatonum.rest <= 0)();
            return;
        }
        dispatch(switchTimer());
        setTimesupPlay(null);
        setCurrentPlay(null);
    };

    return (
        <ButtonGroup $mode={timermode ?? TASKMODE}>
            <CancelIcon
                onClick={messageHandler(CANCELMODAL, !currentOnTaskId)}
            />
            {timerstatus ? (
                <PauseIcon onClick={PlayHandler} />
            ) : (
                <PlayIcon onClick={PlayHandler} />
            )}
            <NextTaskIcon
                onClick={messageHandler(
                    SKIPMODAL,
                    !currentOnTaskId || timertomatonum.rest <= 0
                )}
            />
            <Modal />
        </ButtonGroup>
    );
}
export default TimerButtons;
