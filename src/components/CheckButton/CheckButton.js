import styled from "styled-components";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { ReactComponent as CheckIcon } from "@images/Check.svg";
import { dataTypes } from "@pages/AnalysisPage/type";
import { today } from "@pages/AnalysisPage/calculate";
import { toggleTodoThunk } from "@redux/reducers/todo/slice";
import { memo } from "react";

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

const CheckButton = ({ isCompeleted, id, createdAt }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        if (!isCompeleted) {
            dispatch(
                toggleTodoThunk(createdAt === today, {
                    todo: { id },
                    chart: [{ key: dataTypes.compeletedTaskNum, value: 1 }],
                })
            );
        } else {
            dispatch(
                toggleTodoThunk(createdAt === today, {
                    todo: { id },
                    chart: [{ key: "totaltask", value: 1 }],
                })
            );
        }
    };
    return (
        <Checkbox $isCompeleted={isCompeleted} onClick={handleClick}>
            {isCompeleted && <CheckIcon />}
        </Checkbox>
    );
};
export default memo(CheckButton, (prevProps, nextProps) => {
    if (prevProps.isCompeleted === nextProps.isCompeleted) return true;
    return false;
});

CheckButton.propTypes = {
    isCompeleted: PropTypes.bool,
    id: PropTypes.string,
    initialTimer: PropTypes.func,
    createdAt: PropTypes.string,
};
