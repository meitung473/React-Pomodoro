import { createContext, useContext, useState, useMemo } from "react";
import styled from "styled-components";
import { br } from "@constants/device";
import { Link, useLocation } from "react-router-dom";
import { Pages } from "@constants/Pages";
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

const HeaderContext = createContext();
function Header({ children }) {
    let location = useLocation();
    const Pageindex = useMemo(
        () =>
            Object.values(Pages).findIndex(
                ({ name }) => "/" + name === location.pathname
            ),
        [location.pathname]
    );

    return (
        <HeaderContext.Provider value={{ currentPage: location.pathname }}>
            <Navgation>
                <Container>{children}</Container>
                <Indicator $index={Pageindex} />
            </Navgation>
        </HeaderContext.Provider>
    );
}
function ListLink({ children, to, name }) {
    const [onoff, setOnoff] = useState(false);
    const { currentPage } = useContext(HeaderContext);

    return (
        <List $currentPage={currentPage === "/" + name}>
            <Link to={onoff ? "/" : to} onClick={() => setOnoff(!onoff)}>
                {children}
            </Link>
        </List>
    );
}

Header.ListItem = ListLink;
Header.Indicator = Indicator;

export default Header;
