import React, { useContext } from "react";

import { TimerContext } from "@constants/context";
import { useSelector, useDispatch } from "react-redux";
import { dataTypes } from "@pages/AnalysisPage/type";
import { updateChart } from "@redux/reducers/chart";
import { toggleTodo } from "@redux/reducers/todo";
import { selectorTimer } from "@redux/selector";
import { Body, DefaultFooter } from "../Modal.style";
import { useModal } from "@components/Modal/ModalcontextPackage";

function FinishModal() {
    const { initialTimer } = useContext(TimerContext);
    const { setModalName } = useModal();

    const timer = useSelector(selectorTimer);
    const dispatch = useDispatch();

    const finish = () => {
        dispatch(toggleTodo(timer.currentOnTaskId));
        dispatch(updateChart(dataTypes.compeletedTaskNum, 1));
        initialTimer(null);
        setModalName(null);
    };

    return (
        <>
            <Body>
                <p>
                    指定番茄時間結束，任務確認完成?
                    <br />
                    確認後，將重置番茄時間
                </p>
            </Body>
            <DefaultFooter callback={finish} />
        </>
    );
}

export default FinishModal;
