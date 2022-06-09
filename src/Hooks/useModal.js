import { useState } from "react";

function useModal() {
    const [show, setShow] = useState(false);
    const [modalName, setModalName] = useState(null);
    const openModal = (name) => {
        if (show) return;
        setModalName(name);
        setShow(true);
    };
    const closeModal = () => {
        setShow(false);
        setModalName(null);
    };
    const EventModal = (cb) => () => {
        cb();
    };
    return {
        openModal,
        closeModal,
        modalName,
        EventModal,
        show,
    };
}
export default useModal;
