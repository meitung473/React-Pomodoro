import React, { useContext } from "react";

import { Modal } from "../..";
import { ModalContext, TimerContext } from "@constants/context";

function CancelModal() {
    const { initialTimer } = useContext(TimerContext);
    const { closeModal } = useContext(ModalContext);
    const cancel = () => {
        initialTimer(null);
        closeModal();
    };

    return (
        <Modal.Wrapper>
            <Modal.Title>終止任務</Modal.Title>
            <Modal.Body>
                <p>
                    您確定要終止目前任務?。
                    <br />
                    此次番茄鐘將不列入計算。
                </p>
            </Modal.Body>
            <Modal.DefaultFooter callback={cancel} />
        </Modal.Wrapper>
    );
}

export default CancelModal;
