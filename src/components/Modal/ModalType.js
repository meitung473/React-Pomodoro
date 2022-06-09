import AddModal from "./modals/AddModal";
import CancelModal from "./modals/CancelModal";
import FinishModal from "./modals/FinishModal";
import MessageModal from "./modals/MessageModal";
import SkipModal from "./modals/SkipModal";

export const ADDMODAL = "add";
export const SKIPMODAL = "skip";
export const CANCELMODAL = "cancel";
export const FINISHMODAL = "finish";
export const WARN_STARTMODAL = "warn_start";
export const WARN_NONTASKCANCEL = "warn_nontaskcancel";
export const WARN_NONSKIP = "warn_nonskip";

const message = {
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

export const component = {
    [ADDMODAL]: <AddModal />,
    [SKIPMODAL]: <SkipModal />,
    [CANCELMODAL]: <CancelModal />,
    [FINISHMODAL]: <FinishModal />,
};

export const modalComponent = Object.assign(
    component,
    Object.entries(message).reduce((p, n) => {
        const [name, content] = n;
        p[name] = <MessageModal message={content} />;
        return p;
    }, {})
);
