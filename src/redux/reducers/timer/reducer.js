import {
    SET_TIMER,
    SWITCH_TIMER,
    SET_CURRENTONTASKID,
    SET_TIMERTOMATONUM,
    UPDATE_TIMERTOMATONUM,
    RESET_TIMER,
    UPDATE_CURRENTTIME,
} from "./actionType";

const initalState = {
    timermode: null,
    timerstatus: false,
    timertomatonum: {
        task: 0,
        rest: 0,
    },
    currentOnTaskId: null,
    cachecurrentTime: null,
};
// 必要的 action 整理
/**
 * 1. 換輪 : (Next Round)
 *      更新"模式"中的番茄數 : timertomatonum
 *      更新"模式" : timermode
 *      更新時間狀態 (暫停) : timerstatus
 *      更新整個時間，切換到下一個模式 : cachecurrentTime 切到 25 或 5
 * 2. 單純每秒更新時間 : (Update currentTime)
 *      按照模式 : cachecurrentTime 每次 - 1
 * 3. 初始化 (有 id 或者 沒 id 初始整個) : (Initialize)
 *      更新"模式"中的番茄數 : timertomatonum => 全部都 0
 *      切換到任務模式 : timermode = task
 *      暫停時間狀態 : timerstatus
 *
 * 4. 單純暫停/開始 : (Switch Time Mode)
 * 5. 跳過目前模式 : (Skip Mode )
 *      切換模式 : 切換到相反的模式 (action 裡面判斷)
 *      更新"模式"番茄 : timertomatonum 模式 - 1 或是判斷 0 的情況
 *      暫停時間狀態
 * 6. 完成模式 => 初始化 (決定用 thunk 來處理，因為多個 action，怎麼同時更新 chart 的 action 呢 ?)
 */

export default function timerReducer(state = initalState, action) {
    switch (action.type) {
        case SET_TIMER:
            return {
                ...state,
                timermode: action.payload,
            };
        case SWITCH_TIMER:
            return {
                ...state,
                timerstatus: action.payload,
            };
        case SET_CURRENTONTASKID:
            return {
                ...state,
                currentOnTaskId: action.payload,
            };
        case UPDATE_TIMERTOMATONUM:
            return {
                ...state,
                timertomatonum: {
                    ...state.timertomatonum,
                    [action.payload]: state.timertomatonum[action.payload] - 1,
                },
            };
        case SET_TIMERTOMATONUM:
            return {
                ...state,
                timertomatonum: action.payload,
            };
        case RESET_TIMER:
            return {
                ...state,
                timermode: null,
                timerstatus: false,
                timertomatonum: {
                    task: 0,
                    rest: 0,
                },
                currentOnTaskId: null,
            };
        case UPDATE_CURRENTTIME:
            return {
                ...state,
                cachecurrentTime: action.payload,
            };
        default:
            return state;
    }
}
