import AddModal from "./modals/AddModal";
import CancelModal from "./modals/CancelModal";
import FinishModal from "./modals/FinishModal";
import MessageModal from "./modals/MessageModal";
import SkipModal from "./modals/SkipModal";

const Modals = [AddModal, CancelModal, FinishModal, SkipModal, MessageModal];

const ModalBox = {};
Object.assign(
    ModalBox,
    Modals.reduce((modals, type) => {
        const key = type.name;
        modals[key] = type;
        return modals;
    }, {})
);

export { ModalProvider, useModal, Modal } from "./ModalcontextPackage";
export { ModalBox };
