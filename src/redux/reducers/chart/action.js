import { LOAD_CHART, UPDATE_CHART } from "./actionType";

// 處理分析表
export function loadChart() {
    return {
        type: LOAD_CHART,
    };
}
// 更新分析表 (待優化)
export function updateChart(key, value) {
    return {
        type: UPDATE_CHART,
        payload: {
            key,
            value,
        },
    };
}
