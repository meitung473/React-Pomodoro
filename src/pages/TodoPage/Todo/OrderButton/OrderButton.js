import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { createSelector } from "@reduxjs/toolkit";
import { selectorTodo } from "@redux/selector";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { orderTodo } from "@redux/reducers/todo/slice";

const Triangle = css`
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    cursor: pointer;
    ${({ $hidden }) => $hidden && "visibility: hidden;"}
`;

const Upper = styled.span`
    ${Triangle}
    border-bottom: 10px solid ${({ theme }) => theme.Warn.inactive};
    margin-right: 6px;
`;
const Downer = styled.span`
    ${Triangle}
    border-top: 10px solid ${({ theme }) => theme.Warn.inactive};
`;
const OrderSlot = styled.div`
    display: flex;
    align-items: center;
`;

const selectUncompletedTodos = createSelector(selectorTodo, (todos) =>
    todos
        .filter((todo) => !todo.isCompeleted)
        .reduce((TodoIndexs, todo) => {
            TodoIndexs.push(todo.id);
            return TodoIndexs;
        }, [])
);
const selectTodoIndexs = createSelector(selectorTodo, (todos) =>
    todos.reduce((TodoIndexs, todo) => {
        TodoIndexs.push(todo.id);
        return TodoIndexs;
    }, [])
);

const OrderButton = ({ id }) => {
    const todos = useSelector(selectUncompletedTodos);
    const Indexs = useSelector(selectTodoIndexs);

    const dispatch = useDispatch();
    const thisOrder = todos.findIndex((todoid) => todoid === id);
    const handleOrder = useCallback(
        (num) => () => {
            let realIndex = Indexs.findIndex((todoid) => todoid === id);
            let changeTodo = todos[thisOrder + num];
            let changeIndex = Indexs.findIndex(
                (todoid) => todoid === changeTodo
            );
            dispatch(orderTodo(realIndex, changeIndex));
        },
        [Indexs, todos, thisOrder, dispatch, id]
    );
    const triangles = useMemo(() => {
        let upperhidden = false;
        let downhidden = false;
        if (thisOrder === 0) {
            upperhidden = true;
        }
        if (thisOrder === todos.length - 1) {
            downhidden = true;
        }
        return (
            <>
                <Upper $hidden={upperhidden} onClick={handleOrder(-1)} />
                <Downer $hidden={downhidden} onClick={handleOrder(1)} />
            </>
        );
    }, [thisOrder, todos.length]);
    return <OrderSlot>{triangles}</OrderSlot>;
};

export default OrderButton;

OrderButton.propTypes = {
    id: PropTypes.string,
};
