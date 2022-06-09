import { UPDATE_CHART } from "./actionType";
import { today } from "@pages/AnalysisPage/calculate";

const initalState = {
    data: [
        // {
        //     dataTime: moment().add(-2, "day").format("YYYY-MM-DD"),
        //     tomatoNum: 10,
        //     compeletedTaskNum: 2,
        //     focusTime: 3,
        //     totaltask: 4,
        // },
        // {
        //     dataTime: moment().add(-1, "day").format("YYYY-MM-DD"),
        //     tomatoNum: 5,
        //     compeletedTaskNum: 3,
        //     focusTime: 4,
        //     totaltask: 4,
        // },
        // {
        //     dataTime: moment().format("YYYY-MM-DD"),
        //     tomatoNum: 20,
        //     compeletedTaskNum: 1,
        //     focusTime: 4,
        //     totaltask: 4,
        // },
    ],
};

// 資料結構
const oriDataStructure = {
    tomatoNum: 0,
    compeletedTaskNum: 0,
    focusTime: 0,
    totaltask: 0,
};

export default function chartReducer(state = initalState, action) {
    switch (action.type) {
        case UPDATE_CHART:
            let updateData;
            // 如果今天沒有資料，就新增
            if (!TodayData(state.data)) {
                // 不在目前更新的資料項
                let restdata = noUpadateData(
                    oriDataStructure,
                    action.payload.key
                );
                updateData = {
                    dataTime: today,
                    [action.payload.key]: 1,
                    ...restdata,
                };
                state = {
                    ...state,
                    data: [...state.data, updateData],
                };
            } else {
                // 對原本的資料作變更
                state = {
                    ...state,
                    data: state.data.map((d) => {
                        if (d.dataTime !== today) return d;
                        d[action.payload.key] += action.payload.value;
                        return d;
                    }),
                };
            }
            return state;
        default:
            return state;
    }
}

/**
 * 挖出更新資料以外的欄位 (避免 chart 顯示發生錯誤)
 * @param {Object} structure
 * @param {String} updateone
 * @returns 回傳陣列
 */
function noUpadateData(structure, updateone) {
    let restDatarr = Object.keys(structure).filter(
        (el) => !el.includes(updateone)
    );
    return restDatarr.reduce((prev, nextEl) => {
        prev[nextEl] = 0;
        return prev;
    }, {});
}

/**
 * 拿到資料中"今天"的資料
 * @param {*} datas
 * @returns true or false
 */
function TodayData(datas) {
    return datas.find((data) => data.dataTime === today) || null;
}
