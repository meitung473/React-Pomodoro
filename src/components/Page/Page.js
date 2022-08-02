import { br } from "@constants/device";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.aside`
    background-color: #fff;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    ${br.md} {
        flex-basis: 300px;
        flex-grow: 0;
        margin: 4em 0 4em 4em;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.greyscale.black_0};
        box-shadow: 0 3px 6px ${({ theme }) => theme.greyscale.black_500};
        position: relative;
        top: 0px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
`;

const SubBody = styled.div`
    flex: 1 1 auto;
    max-height: 50%;
    ${br.md} {
        max-height: 50%;
    }
`;

const Header = styled.div`
    background-color: ${({ $bg }) => $bg};
    padding: 0;
    min-height: 2.5em;
    display: flex;
    align-items: center;
    ${({ icon }) =>
        icon &&
        `
            justify-content: space-between;
        `}
`;

const Title = styled.h3`
    letter-spacing: 0.2em;
    font-weight: 400;
    padding: 0 2em;
    ${br.md} {
        padding: 0 1em;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    column-gap: 4px;
    padding-right: 0.8em;
    svg {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
`;

function Page({ children }) {
    return <Container>{children}</Container>;
}

Page.SubBody = SubBody;
Page.Header = Header;
Page.Title = Title;
Page.ButtonGroup = ButtonGroup;

export default Page;

Page.propTypes = {
    children: PropTypes.node,
};
