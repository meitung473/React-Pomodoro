import React from "react";
import { useDispatch } from "react-redux";

import { useModal } from "@components/Modal/ModalcontextPackage";
import { Body, DefaultFooter } from "../Modal.style";
import { nextRound } from "@redux/reducers/timer/slice";

function SkipModal() {
    const { setModalName } = useModal();
    const dispatch = useDispatch();

    const skip = () => {
        dispatch(nextRound());
        setModalName(null);
    };

    return (
        <>
            <Body>
                <p>
                    您確定要跳至休息時間?
                    <br />
                    此次番茄鐘將不列入計算。
                </p>
            </Body>
            <DefaultFooter callback={skip} />
        </>
    );
}

export default SkipModal;
