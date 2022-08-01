import styled from "styled-components";
import { createContext, useContext } from "react";
import ReactDOM from "react-dom";

import PropTypes from "prop-types";

const Overlay = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(200, 200, 200, 0.4);
    backdrop-filter: blur(1px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;
const Wrapper = styled.section`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    min-height: 150px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    z-index: 100;
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
const ActionButton = styled.button`
    width: 80px;
    padding: 5px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
    & + & {
        margin-left: 10px;
    }
`;
const Cancel = styled(ActionButton)`
    background-color: #e4e4e4;
`;

const Confirm = styled(ActionButton)`
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

const ModalContext = createContext();
function Modal({ close, show, event, children }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <ModalContext.Provider value={{ close, event }}>
            <Overlay onClick={() => close()} />
            {children}
        </ModalContext.Provider>,
        document.querySelector("#modal-root")
    );
}
function DefaultFooter({ callback }) {
    const { close, event } = useContext(ModalContext);
    return (
        <Footer>
            <Cancel onClick={close}>取消</Cancel>
            <Confirm onClick={event(callback)}>確認</Confirm>
        </Footer>
    );
}
function ComfirmFooter() {
    const { close } = useContext(ModalContext);
    return (
        <Footer>
            <Confirm onClick={close}>確認</Confirm>
        </Footer>
    );
}

Modal.Wrapper = Wrapper;
Modal.Input = Input;
Modal.Title = Title;
Modal.SubTitle = SubTitle;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.Context = ModalContext;
Modal.DefaultFooter = DefaultFooter;
Modal.ComfirmFooter = ComfirmFooter;

export default Modal;

Modal.propTypes = {
    close: PropTypes.func,
    show: PropTypes.bool,
    event: PropTypes.func,
    children: PropTypes.element,
};
DefaultFooter.propTypes = {
    callback: PropTypes.func,
};
