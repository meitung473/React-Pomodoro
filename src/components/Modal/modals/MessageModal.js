import { Modal } from "../..";

function MessageModal({ message }) {
    return (
        <Modal.Wrapper>
            <Modal.Title>{message?.title || "訊息"}</Modal.Title>
            <Modal.Body>
                <p>{message?.message || "錯誤"}</p>
            </Modal.Body>
            <Modal.ComfirmFooter />
        </Modal.Wrapper>
    );
}

export default MessageModal;
