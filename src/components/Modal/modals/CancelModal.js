import React, { useContext } from "react";
import { TimerContext } from "@constants/context";
import { useModal } from "@components/Modal/ModalcontextPackage";
import { Body, DefaultFooter } from "../Modal.style";

function CancelModal() {
    const { initialTimer } = useContext(TimerContext);
    const { setModalName } = useModal();
    const cancel = () => {
        initialTimer(null);
        setModalName(null);
    };

    return (
        <>
            <Body>
                <p>
                    您確定要終止目前任務?。
                    <br />
                    此次番茄鐘將不列入計算。
                </p>
            </Body>
            <DefaultFooter callback={cancel} />
        </>
    );
}

export default CancelModal;
