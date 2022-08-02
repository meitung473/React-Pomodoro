import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { switchTimerONOFF } from "@redux/reducers/timer";

import { TimerContext } from "@constants/context";
import { useModal } from "@components/Modal/ModalcontextPackage";
import { Body, DefaultFooter } from "../Modal.style";

function SkipModal() {
    const { nextRound } = useContext(TimerContext);
    const { setModalName } = useModal();
    const dispatch = useDispatch();

    const skip = () => {
        nextRound();
        dispatch(switchTimerONOFF(false));
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
