import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { selectorTodo } from "@redux/selector";
import { orderTodo } from "@reducers/todo";

import styled from "styled-components";
import { theme } from "@constants/theme";
import { Page, Todo } from "@components";
import { ReactComponent as OrderIcon } from "@images/Order.svg";
import { ReactComponent as NewTaskIcon } from "@images/NewTask.svg";
import {
    ModalProvider,
    useModal,
    Modal,
} from "@components/Modal/ModalcontextPackage";

const OrderButton = styled(OrderIcon)`
    [data-name*="Polygon"] {
        fill: ${({ theme, $isorder }) =>
            $isorder ? theme.Warn.active : theme.greyscale.black_0};
    }
`;
const selectCompletedTodos = createSelector(selectorTodo, (todos) =>
    todos.filter((todo) => todo.isCompeleted)
);
const selectUncompletedTodos = createSelector(selectorTodo, (todos) =>
    todos.filter((todo) => todo.isCompeleted === false)
);

function NewTask() {
    const { setModalName } = useModal();
    return (
        <>
            <NewTaskIcon onClick={() => setModalName("add")} />
            <Modal />
        </>
    );
}

const TodoPage = () => {
    const CompletedTodos = useSelector(selectCompletedTodos);
    const UncompletedTodos = useSelector(selectUncompletedTodos);
    const dispatch = useDispatch();

    const [isOrder, setisOrder] = useState(false);

    const handleOrder = (order, num) => () => {
        dispatch(orderTodo(order, num));
    };

    const isEnoughToOrder = useMemo(
        () => UncompletedTodos.length < 2,
        [UncompletedTodos.length]
    );

    useEffect(() => {
        if (isEnoughToOrder) {
            setisOrder(() => false);
        }
    }, [isEnoughToOrder]);

    return (
        <ModalProvider>
            <Page>
                <Page.SubBody>
                    <Page.Header icon $bg={theme.primary.Tint}>
                        <Page.Title>代辦事項</Page.Title>
                        <Page.ButtonGroup>
                            <OrderButton
                                $isorder={isOrder}
                                onClick={() => {
                                    if (UncompletedTodos.length < 2) {
                                        alert("有兩個以上的任務才能進行排序");
                                        return;
                                    }
                                    setisOrder((Order) => !Order);
                                }}
                            />
                            <NewTask />
                        </Page.ButtonGroup>
                    </Page.Header>
                    <Todo>
                        {UncompletedTodos.map((todo, i) => (
                            <Todo.InCompeletedItem
                                key={todo.id}
                                isOrder={isOrder}
                                isfirst={i === 0}
                                islast={i === UncompletedTodos.length - 1}
                                handleOrder={handleOrder}
                                thisorder={i}
                                todo={todo}
                            />
                        ))}
                    </Todo>
                </Page.SubBody>
                <Page.SubBody>
                    <Page.Header $bg={theme.Warn.inactive}>
                        <Page.Title>已完成任務</Page.Title>
                    </Page.Header>
                    <Todo>
                        {CompletedTodos.map((todo) => (
                            <Todo.CompeletedItem key={todo.id} todo={todo} />
                        ))}
                    </Todo>
                </Page.SubBody>
            </Page>
        </ModalProvider>
    );
};
export default TodoPage;
