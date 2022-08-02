import { br } from "@constants/device";
import { useModal } from "@components/Modal/ModalcontextPackage";
import styled, { css } from "styled-components";

const Wrapper = styled.section`
    position: absolute;
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    min-height: 150px;
    background-color: ${({ theme }) => theme.greyscale.black_0};
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
    z-index: 100;
    ${br.md} {
        width: 300px;
    }
`;
const Body = styled.div`
    flex-grow: 1;
    padding: 10px 20px;
    line-height: 1.7;
    p {
        font-size: 14px;
        white-space: pre;
    }
`;

const Footer = styled.footer`
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
`;
const Title = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    align-items: center;
    background-color: #92f2e9;
`;
const buttonstyle = css`
    width: 80px;
    padding: 5px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    & + & {
        margin-left: 10px;
    }
`;

const Cancel = styled.button`
    ${buttonstyle}
    background-color: #e4e4e4;
`;

const Confirm = styled.button`
    ${buttonstyle}
    background-color: #92f2e9;
`;

const SubTitle = styled.span`
    display: block;
    font-size: 12px;
    font-weight: 400;
    margin-bottom: 0.4em;
`;

const Input = styled.input`
    width: 100%;
    border: none;
    border-bottom: 1px solid #000;
    &:focus {
        outline: none;
    }
`;
function DefaultFooter({ callback }) {
    const { EventCallback, setModalName } = useModal();
    return (
        <Footer>
            <Cancel onClick={() => setModalName(null)}>取消</Cancel>
            <Confirm onClick={EventCallback(callback)}>確認</Confirm>
        </Footer>
    );
}
function ComfirmFooter() {
    const { setModalName } = useModal();
    return (
        <Footer>
            <Confirm onClick={() => setModalName(null)}>確認</Confirm>
        </Footer>
    );
}
export {
    Wrapper,
    Body,
    Footer,
    Title,
    Cancel,
    Confirm,
    SubTitle,
    Input,
    DefaultFooter,
    ComfirmFooter,
};
