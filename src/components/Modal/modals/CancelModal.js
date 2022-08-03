import React from "react";
import { useModal } from "@components/Modal/ModalcontextPackage";
import { Body, DefaultFooter } from "../Modal.style";
import { useDispatch } from "react-redux";
import { initializeTimer } from "@redux/reducers/timer/slice";

function CancelModal() {
    const { setModalName } = useModal();
    const dispatch = useDispatch();

    const cancel = () => {
        dispatch(initializeTimer());
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
