import { createContext, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectorTimer } from "@redux/selector";

const Context = createContext(null);
Context.displayName = "TimerContext";

/**
 * 主要做 3 件事，而且用 select timer 都能計算出來
 * 1. 輪替
 * 2. 初始化
 */

// 因為操作都是來自 store ，沒有自己的 state
function useTimer() {
    const timer = useSelector(selectorTimer);
    const dispatch = useDispatch();
    const _timemode = timer.timermode;

    const updateTimer = () => {};

    // 目前的時間 ?
    // next Round
    /**
     * 1. 轉換 mode
     * 2. 回復 圖標初始狀態
     * 3. 換上 番茄鐘 mode time
     * 4.
     */
    const turnRound = useCallback(() => {
        // const nextMode =
    }, []);

    // 初始化 Timer
    /* 情況 : 
        (1) 完全清空 (null)
        (2) 中途取消，切換別的任務 id
        (3) 
    */
    /*  1. 更新目前任務 id
        2. 更新目前任務模式
        3. 更新目前圖標顯示，按照 currentTime 除以圓周
    */
    const initializeTimer = () => {};

    return {};
}
