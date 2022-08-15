import { createSlice } from "@reduxjs/toolkit";
import { today } from "@pages/AnalysisPage/calculate";

const initialState = {
    data: [],
};

const oriDataStructure = {
    tomatoNum: 0,
    compeletedTaskNum: 0,
    focusTime: 0,
    totaltask: 0,
};
const chartSlice = createSlice({
    name: "chart",
    initialState,
    reducers: {
        updateChart: {
            reducer: (state, action) => {
                let updateData;
                // 如果今天沒有資料，就新增
                if (!TodayData(state.data)) {
                    // 不在目前更新的資料項
                    let restdata = noUpadateData(action.payload.key);
                    updateData = {
                        dataTime: today,
                        [action.payload.key]: action.payload.value,
                        ...restdata,
                    };
                    state.data = [updateData, ...state.data];
                } else {
                    // 對原本的資料作變更
                    state.data = state.data.map((d) => {
                        if (d.dataTime !== today) return d;
                        d[action.payload.key] += action.payload.value;
                        return d;
                    });
                }
            },
            prepare: (key, value) => {
                return { payload: { key, value } };
            },
        },
    },
    extraReducers: {},
});

/**
 * 挖出更新資料以外的欄位 (避免 chart 顯示發生錯誤)
 * @param {Object} structure
 * @param {String} updateone
 * @returns 回傳陣列
 */
function noUpadateData(updateone) {
    let restDatarr = Object.keys(oriDataStructure).filter(
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

export const { updateChart } = chartSlice.actions;
export default chartSlice.reducer;
