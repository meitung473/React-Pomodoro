import { today } from "@pages/AnalysisPage/calculate";
import { v4 } from "uuid";
import {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
    EDIT_TODO,
    SET_NOWEDITINGTODO,
    ORDER_TODO,
    UPDATE_TODO_DATE,
} from "./actionType";

// let todoId = 1;
const initalState = {
    todos: [
        // {
        //     id: 1,
        //     content: "test",
        //     isCompeleted: false,
        //     tomatoNum: 3,
        //     createdAt: "2022-06-07",
        // },
    ],
    nowEditing: null,
};
export default function todoReducer(state = initalState, action) {
    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    {
                        id: v4(),
                        content: action.payload.content,
                        isCompeleted: false,
                        tomatoNum: action.payload.tomatoNum,
                        createdAt: today,
                    },
                    ...state.todos,
                ],
            };
        //編輯
        case SET_NOWEDITINGTODO:
            return {
                ...state,
                nowEditing: action.payload,
            };
        case EDIT_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? {
                              ...todo,
                              content: action.payload.content,
                          }
                        : todo
                ),
            };
        case DELETE_TODO:
            return {
                ...state,
                todos: state.todos.filter(
                    (todo) => todo.id !== action.payload.id
                ),
            };
        case TOGGLE_TODO:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? {
                              ...todo,
                              isCompeleted: !todo.isCompeleted,
                          }
                        : todo
                ),
            };
        case ORDER_TODO:
            let imcompeletedarr = state.todos.filter(
                (todo) => !todo.isCompeleted
            );
            let compeletedarr = state.todos.filter((todo) => todo.isCompeleted);

            [
                imcompeletedarr[action.payload.order],
                imcompeletedarr[action.payload.order + action.payload.num],
            ] = [
                imcompeletedarr[action.payload.order + action.payload.num],
                imcompeletedarr[action.payload.order],
            ];

            return {
                ...state,
                todos: [...imcompeletedarr, ...compeletedarr],
            };
        case UPDATE_TODO_DATE:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload.id
                        ? {
                              ...todo,
                              createdAt: today,
                          }
                        : todo
                ),
            };
        default:
            return state;
    }
}
