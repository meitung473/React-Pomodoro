import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { switchTimerONOFF } from "@redux/reducers/timer";

import { ModalContext, TimerContext } from "@constants/context";
import Modal from "../Modal";

function SkipModal() {
    const { nextRound } = useContext(TimerContext);
    const { closeModal } = useContext(ModalContext);
    const dispatch = useDispatch();

    const skip = () => {
        nextRound();
        dispatch(switchTimerONOFF(false));
        closeModal();
    };

    return (
        <Modal.Wrapper>
            <Modal.Title>跳至休息時間</Modal.Title>
            <Modal.Body>
                <p>
                    您確定要跳至休息時間?
                    <br />
                    此次番茄鐘將不列入計算。
                </p>
            </Modal.Body>
            <Modal.DefaultFooter callback={skip} />
        </Modal.Wrapper>
    );
}

export default SkipModal;
