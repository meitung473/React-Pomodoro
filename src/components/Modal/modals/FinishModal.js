import React from "react";
import { useDispatch } from "react-redux";
import { Body, DefaultFooter } from "../Modal.style";
import { useModal } from "@components/Modal/ModalcontextPackage";
import { finishTodo } from "@redux/reducers/todo/slice";

function FinishModal() {
    const { setModalName } = useModal();
    const dispatch = useDispatch();

    const finish = () => {
        dispatch(finishTodo());
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
