import { createPortal } from "react-dom";
import useToggle from "../../Hooks/useToggle";
import styled from "styled-components";
import PropTypes from "prop-types";
import { br } from "@constants/device";
import { useMemo, useState, createContext, useContext, useEffect } from "react";
import { modalComponent } from "@components/Modal/ModalType";

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
    display: flex;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    min-height: 150px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    flex-direction: column;
    z-index: 100;
    ${br.md} {
        width: 300px;
    }
`;

const Title = styled.header`
    display: flex;
    justify-content: space-between;
    padding: 10px 10px 10px 20px;
    align-items: center;
    background-color: #92f2e9;
`;

const Context = createContext(null);
Context.displayName = "ModalContext";

function useModal() {
    const value = useContext(Context);
    return value;
}

function ModalProvider({ children }) {
    const { open, ToggleHandler } = useToggle();
    const [modalname, setModalName] = useState(null);
    const value = useMemo(() => {
        const EventCallback = (cb) => () => {
            cb();
        };

        return {
            open,
            ToggleHandler,
            EventCallback,
            setModalName,
            modalname,
        };
    }, [modalname]);

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

const modalContainer = document.getElementById("modal-root");

/**
 * access modal name to set up modal type
 * with modal type please see : type2modal.js
 */
function Modal() {
    const { ToggleHandler, modalname, setModalName } = useModal();
    useEffect(() => {
        ToggleHandler();
    }, [modalname]);

    if (!modalname) return;
    const { title, Content } = modalComponent[modalname];
    return createPortal(
        <>
            <Overlay onClick={() => setModalName(null)} />
            <Wrapper>
                <Title>{title}</Title>
                <Content />
            </Wrapper>
        </>,
        modalContainer
    );
}
export { ModalProvider, useModal, Modal };
