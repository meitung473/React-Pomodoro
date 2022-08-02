import PropTypes from "prop-types";
import { Body, ComfirmFooter } from "../Modal.style";
function MessageModal({ message }) {
    return (
        <>
            <Body>
                <p>{message?.message || "錯誤"}</p>
            </Body>
            <ComfirmFooter />
        </>
    );
}

export default MessageModal;

MessageModal.propTypes = {
    message: PropTypes.object,
};
