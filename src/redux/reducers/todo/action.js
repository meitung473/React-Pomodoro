import {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
    SET_NOWEDITINGTODO,
    ORDER_TODO,
    EDIT_TODO,
    LOAD_TODO,
    UPDATE_TODO_DATE,
} from "./actionType";

//新增項目
export function addTodo(content, tomatoNum) {
    return {
        type: ADD_TODO,
        payload: {
            content,
            tomatoNum,
        },
    };
}

export function deleteTodo(id) {
    return {
        type: DELETE_TODO,
        payload: { id },
    };
}
export function toggleTodo(id) {
    return {
        type: TOGGLE_TODO,
        payload: { id },
    };
}
export function editTodo(id, content) {
    return {
        type: EDIT_TODO,
        payload: { id, content },
    };
}
export function setnoweditTodo(id) {
    return {
        type: SET_NOWEDITINGTODO,
        payload: id,
    };
}

export function updateTodoDate(id) {
    return {
        type: UPDATE_TODO_DATE,
        payload: {
            id,
        },
    };
}

export function orderTodo(order, num) {
    return {
        type: ORDER_TODO,
        payload: { order: order, num: num },
    };
}

export function loadTodo() {
    return {
        type: LOAD_TODO,
    };
}
