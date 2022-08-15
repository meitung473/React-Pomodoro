import styled from "styled-components";
import { useSelector } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import { selectorEditingTodo, selectorTodo } from "@redux/selector";

import useToggle from "@Hooks/useToggle";

import {
    ModalProvider,
    useModal,
    Modal,
} from "@components/Modal/ModalcontextPackage";
import { Todo, TodoList } from "./Todo";
import { ReactComponent as OrderIcon } from "@images/Order.svg";
import { ReactComponent as NewTaskIcon } from "@images/NewTask.svg";

import { theme } from "@constants/theme";
import { Page } from "../../Layout";

const Order = styled(OrderIcon)`
    [data-name*="Polygon"] {
        fill: ${({ theme, $order }) =>
            $order ? theme.Warn.active : theme.greyscale.black_0};
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

    const NowEditingId = useSelector(selectorEditingTodo);

    // for editing todo
    const { ToggleHandler: toggleOrder, open: order } = useToggle();

    return (
        <ModalProvider>
            <Page>
                <Page.SubBody>
                    <Page.Header icon $bg={theme.primary.Tint}>
                        <Page.Title>代辦事項</Page.Title>
                        <Page.ButtonGroup>
                            <Order
                                $order={order}
                                onClick={() => {
                                    if (UncompletedTodos.length < 2) {
                                        alert("有兩個以上的任務才能進行排序");
                                        return;
                                    }
                                    toggleOrder();
                                }}
                            />
                            <NewTask />
                        </Page.ButtonGroup>
                    </Page.Header>
                    <TodoList>
                        {UncompletedTodos.map((todo, i) => (
                            <Todo
                                key={todo.id}
                                todo={todo}
                                isorder={order}
                                NowEditingId={NowEditingId}
                            />
                        ))}
                    </TodoList>
                </Page.SubBody>
                <Page.SubBody>
                    <Page.Header $bg={theme.Warn.inactive}>
                        <Page.Title>已完成任務</Page.Title>
                    </Page.Header>
                    <TodoList>
                        {CompletedTodos.map((todo, i) => (
                            <Todo key={todo.id} todo={todo} />
                        ))}
                    </TodoList>
                </Page.SubBody>
            </Page>
        </ModalProvider>
    );
};
export default TodoPage;
