import styled from "styled-components";
import { adjustOpacity } from "@constants/theme";
import { br } from "@constants/device";

const List = styled.ul`
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
const ItemWrapper = styled.li`
    display: flex;
    position: relative;
    padding: 0.5em 0;
    align-items: flex-start;
    &:not(:last-child):after {
        content: "";
        border-bottom: 1px solid ${({ theme }) => theme.text.light};
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;
const Header = styled.span`
    display: flex;
    align-items: center;
    align-self: stretch;
`;
const Body = styled.div`
    flex-grow: 1;
    display: flex;

    justify-content: flex-start;
`;
const Content = styled.textarea`
    margin: 0;
    padding: 0 0.4em;
    display: flex;
    word-break: break-word;
    height: ${({ $height }) => $height}px;
    box-sizing: border-box;
    width: 100%;
    resize: none;
    outline: none;
    border: none;
    font-size: 1em;
    overflow: hidden;
    font-family: "Noto Sans TC", sans-serif;
    cursor: default;
    ${({ $isEdit, theme }) =>
        $isEdit &&
        `
            border: 1px solid ${theme.primary.Default};
            cursor: text;
    `}
`;
const Edit = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    resize: none;
    border: 1px solid ${({ theme }) => theme.primary.Default};
    outline: none;
    height: ${({ $height }) => {
        return $height + "px";
    }};
    font-size: 1em;
    overflow: hidden;
    font-family: "Noto Sans TC", sans-serif;
`;

const Footer = styled.span`
    display: flex;
    column-gap: 4px;
    margin-left: 0.2em;
    align-items: center;
    svg {
        cursor: pointer;
    }
    [data-name="bg"] {
        ${({ theme, $active }) =>
            $active &&
            `
            fill: ${theme.Warn.active};
        `}
    }
`;

const TomatoConatiner = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const TomatoSlot = styled.span`
    position: relative;
    overflow: hidden;
    display: inline-block;
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    & + & {
        margin-left: 0.1em;
    }
    background-color: ${({ $fill, theme }) =>
        $fill ? theme.primary.Default : theme.Warn.inactive};
`;

export {
    List,
    ItemWrapper,
    Content,
    Header,
    Body,
    Edit,
    Footer,
    TomatoConatiner,
    TomatoSlot,
};
