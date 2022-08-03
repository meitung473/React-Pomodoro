import FinishModal from "./modals/FinishModal";
import MessageModal from "./modals/MessageModal";
import AddModal from "./modals/AddModal";
import SkipModal from "./modals/SkipModal";
import CancelModal from "./modals/CancelModal";

/**
 * type string
 */
export const ADDMODAL = "add";
export const SKIPMODAL = "skip";
export const CANCELMODAL = "cancel";
export const FINISHMODAL = "finish";
export const WARN_STARTMODAL = "warn_finish";
export const WARN_NONTASKCANCEL = "warn_cancel";
export const WARN_NONSKIP = "warn_skip";

/**
 * 單純訊息 modal
 */
const messageModals = {
    [WARN_STARTMODAL]: {
        title: "提醒",
        message: "選定一項任務再開始",
    },
    [WARN_NONTASKCANCEL]: {
        title: "提醒",
        message: "目前沒有任務可以終止",
    },
    [WARN_NONSKIP]: {
        title: "提醒",
        message: "目前階段沒辦法跳過",
    },
};

/**
 * 具有特殊功能的 modal
 */
const component = {
    [ADDMODAL]: {
        title: "新增任務",
        Content: AddModal,
    },
    [SKIPMODAL]: {
        title: "跳過任務",
        Content: SkipModal,
    },
    [CANCELMODAL]: {
        title: "取消任務",
        Content: CancelModal,
    },
    [FINISHMODAL]: {
        title: "完成任務",
        Content: FinishModal,
    },
};

export const modalComponent = Object.assign(
    component,
    Object.entries(messageModals).reduce((p, n) => {
        const [keyname, content] = n;
        p[keyname] = {
            title: content.title,
            Content: () => <MessageModal message={content} />,
        };
        return p;
    }, {})
);
