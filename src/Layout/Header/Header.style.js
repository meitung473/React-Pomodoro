import styled from "styled-components";
import { br } from "@constants/device";

const Container = styled.ul`
    background-color: ${({ theme }) => theme.primary.Default};
    display: flex;
    ${br.md} {
        box-sizing: border-box;
        padding: 0.5em 0;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
`;
const Navgation = styled.nav`
    position: relative;
    ${br.md} {
        height: 100%;
    }
`;
const Indicator = styled.span`
    display: none;
    ${br.md} {
        display: block;
        position: absolute;
        left: 120%;
        width: 0;
        height: 0;
        top: 0;
        display: block;
        border-style: solid;
        border-width: 15px 30px 15px 0;
        border-color: transparent ${({ theme }) => theme.primary.Tint}
            transparent transparent;
        transition: transform 0.3s ease-in-out, opacity 0.3s ease-in;
        ${({ $index }) =>
            $index < 0
                ? `
                opacity: 0;
        transform: translateY(0%);
        `
                : `
                opacity: 1;
        transform: translateY(${80 + 70 * $index}px);
        
        `}
    }
`;

const List = styled.li`
    svg {
        width: 30px;
        height: 30px;
    }
    list-style: none;
    width: 100%;
    box-sizing: border-box;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 auto;
    background-color: ${({ $currentPage, theme }) =>
        $currentPage === true ? theme.primary.Dark : "transparent"};
    padding: 0.5em 1em;
    ${br.md} {
        padding: 1em;
        flex: 0;
        &:nth-of-type(1) {
            margin-top: 64px;
        }
    }
`;

export { Container, Navgation, Indicator, List };
