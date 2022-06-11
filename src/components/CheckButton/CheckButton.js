import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateChart } from "@reducers/chart";
import { ReactComponent as CheckIcon } from "@images/Check.svg";
import { dataTypes } from "@pages/AnalysisPage/type";
import { toggleTodo } from "@reducers/todo";
import { selectorTimer } from "@redux/selector";
import { createSelector } from "@reduxjs/toolkit";
import { today } from "@pages/AnalysisPage/calculate";
import { updateTodoDate } from "@redux/reducers/todo/action";
import { useSelector } from "react-redux";

const Checkbox = styled.div`
    height: 12px;
    width: 12px;
    background-color: ${({ theme }) => theme.greyscale.black_0};
    border: 3px solid
        ${({ theme, $isCompeleted }) =>
            $isCompeleted ? theme.Warn.inactive : theme.primary.Default};
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    svg {
        width: 12px;
        height: 12px;
        position: absolute;
        z-index: 1;
    }
`;
const selectorTimercurrentId = createSelector(
    selectorTimer,
    (timer) => timer.currentOnTaskId
);
const CheckButton = ({ isCompeleted, id, initialTimer, createdAt }) => {
    const dispatch = useDispatch();
    const currentId = useSelector(selectorTimercurrentId);
    return (
        <Checkbox
            $isCompeleted={isCompeleted}
            onClick={() => {
                dispatch(toggleTodo(id));
                if (!isCompeleted) {
                    // 矯正不是當日新增
                    if (createdAt !== today) {
                        dispatch(updateTodoDate(id));
                        dispatch(updateChart("totaltask", 1));
                    }
                    dispatch(updateChart(dataTypes.compeletedTaskNum, 1));
                } else {
                    if (createdAt !== today) {
                        dispatch(updateTodoDate(id));
                    }
                    dispatch(updateChart("totaltask", 1));
                }
                if (id === currentId) {
                    initialTimer(null);
                }
            }}
        >
            {isCompeleted && <CheckIcon />}
        </Checkbox>
    );
};
export default CheckButton;
