import { br } from "@constants/device";
import { adjustOpacity } from "@constants/theme";
import styled from "styled-components";

const TodoList = styled.ul`
    overflow-x: hidden;
    height: calc(100% - 2.5em);
    margin-top: auto;
    padding: 0 2em;
    ::-webkit-scrollbar {
        width: 0.4em;
    }
    ::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.text.light};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => adjustOpacity(theme.text.dark, 0.25)};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => adjustOpacity(theme.text.dark, 0.5)};
    }
    ${br.md} {
        padding: 0 0.5em;
    }
`;
export default TodoList;
