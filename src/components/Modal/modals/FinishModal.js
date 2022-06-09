import React, { useContext } from "react";

import { Modal } from "../..";
import { ModalContext, TimerContext } from "@constants/context";
import { useSelector, useDispatch } from "react-redux";
import { dataTypes } from "@pages/AnalysisPage/type";
import { updateChart } from "@redux/reducers/chart";
import { toggleTodo } from "@redux/reducers/todo";
import { selectorTimer } from "@redux/selector";

function FinishModal() {
    const { initialTimer } = useContext(TimerContext);
    const { closeModal } = useContext(ModalContext);
    const timer = useSelector(selectorTimer);
    const dispatch = useDispatch();

    const finish = () => {
        dispatch(toggleTodo(timer.currentOnTaskId));
        dispatch(updateChart(dataTypes.compeletedTaskNum, 1));
        // dispatch(updateChart("totaltask", 1));
        initialTimer(null);
        closeModal();
    };

    return (
        <Modal.Wrapper>
            <Modal.Title>完成任務</Modal.Title>
            <Modal.Body>
                <p>
                    指定番茄時間結束，任務確認完成?
                    <br />
                    確認後，將重置番茄時間
                </p>
            </Modal.Body>
            <Modal.DefaultFooter callback={finish} />
        </Modal.Wrapper>
    );
}

export default FinishModal;
