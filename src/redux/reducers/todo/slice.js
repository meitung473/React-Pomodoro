import { createSlice } from "@reduxjs/toolkit";
import { today } from "@pages/AnalysisPage/calculate";
import { v4 } from "uuid";
import { updateChart } from "../chart/slice";
import { initializeTimer } from "../timer/slice";
import { dataTypes } from "@pages/AnalysisPage/type";

const initialState = {
    todos: [],
    nowEditing: null,
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action) => {
                state.todos.unshift({
                    id: v4(),
                    content: action.payload.content,
                    isCompeleted: false,
                    tomatoNum: action.payload.tomato,
                    createdAt: today,
                });
            },
            prepare: (content, tomato) => ({ payload: { content, tomato } }),
        },
        toggleTodo: {
            reducer: (state, action) => {
                state.todos.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.isCompeleted = !todo.isCompeleted;
                    }
                    return;
                });
            },
            prepare: (id) => ({ payload: { id } }),
        },
        deleTodo: {
            reducer: (state, action) => {
                state.todos = state.todos.filter(
                    (todo) => todo.id !== action.payload.id
                );
            },
            prepare: (id) => ({ payload: { id } }),
        },
        updateTodoDate: {
            reducer: (state, action) => {
                state.todos.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.createdAt = today;
                    }
                });
            },
            prepare: (id) => ({ payload: { id } }),
        },
        editingTodo: {
            reducer: (state, action) => {
                state.nowEditing = action.payload.id;
            },
            prepare: (id = null) => ({ payload: { id } }),
        },
        updateTodoContent: {
            reducer: (state, action) => {
                state.todos.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.content = action.payload.content;
                    }
                });
                state.nowEditing = null;
            },
            prepare: (id, content) => ({ payload: { id, content } }),
        },
        orderTodo: {
            reducer: (state, action) => {
                [
                    state.todos[action.payload.order],
                    state.todos[action.payload.changedOreder],
                ] = [
                    state.todos[action.payload.changedOreder],
                    state.todos[action.payload.order],
                ];
            },
            prepare: (order, changedOreder) => ({
                payload: { order, changedOreder },
            }),
        },
    },
    // extraReducers: {},
});
/**
 * 加入新的 todo
 * @param {*} param0
 * @returns
 */
export function addTodoThunk({ todo, chart }) {
    return function (dispatch) {
        const { content, tomato } = todo;
        const { key, value } = chart;
        dispatch(addTodo(content, tomato));
        dispatch(updateChart(key, value));
    };
}

/**
 * Todo 完成/未完成 按鈕 + chart 更新
 *
 * 1. 判斷是否為今天，若不是；回溯成今天，並且總任務數 + 1
 * 2. 如果已完成，表格更新只有一種；未完成，則包含計算每日番茄數
 *
 * @param {boolean} Istoday today or not
 * @param {Object} {todo : number  ,chart : Array } update value
 * @returns
 */

export function toggleTodoThunk(Istoday = false, { todo, chart }) {
    return function (dispatch, getState) {
        const state = getState();
        const { id } = todo;
        if (!Istoday) {
            dispatch(updateTodoDate(id));
        }
        if (state.timer.currentOnTaskId === id) {
            dispatch(initializeTimer());
        }
        dispatch(toggleTodo(id));
        chart.forEach(({ key, value }) => {
            dispatch(updateChart(key, value));
        });
    };
}

export function cleanTaskTodo(id) {
    return function (dispatch, getState) {
        dispatch(deleTodo(id));
        const state = getState();
        if (state.timer.currentOnTaskId === id) {
            dispatch(initializeTimer());
        }
    };
}

export function finishTodo() {
    return function (dispatch, getState) {
        const state = getState();
        dispatch(toggleTodo(state.timer.currentOnTaskId));
        dispatch(updateChart(dataTypes.compeletedTaskNum, 1));
        dispatch(initializeTimer());
    };
}

export const {
    addTodo,
    toggleTodo,
    deleTodo,
    updateTodoDate,
    editingTodo,
    updateTodoContent,
    orderTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
