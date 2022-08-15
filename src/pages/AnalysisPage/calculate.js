import { dataTypes, Tabs, Description } from "./type";
import moment from "moment";
import zhTW from "../../utils/format/zhtw";

moment.locale("zh-tw", zhTW);
export const today = moment().format("YYYY-MM-DD");

/**
 * 一周的日期從上週星期日 ~ 星期六
 * @returns
 */
export function weekDays() {
    let week = [];
    for (let i = 0; i < 7; i++) {
        week.push(moment().weekday(i).format("YYYY-MM-DD"));
    }
    return week;
}

/**
 * 本周符合的[類型]計算總和
 * @param {Array} data
 * @param {String} type 資料類型
 * @returns 回傳平均或加總的數字
 */
export function weeklyType2Data(data, type) {
    let result;
    switch (type) {
        case dataTypes.compeletedRate:
            let totaltask = findweeklyData(data, "totaltask");
            let compeletedtask = findweeklyData(
                data,
                dataTypes.compeletedTaskNum
            );

            result = datasum(compeletedtask) / datasum(totaltask) || 0;
            return result;
        case dataTypes.compeletedTaskNum:
        case dataTypes.focusTime:
        case dataTypes.tomatoNum:
            result = findweeklyData(data, type);

            return datasum(result);
        default:
            return;
    }
}
/**
 * 回傳某日資料
 * @param {Object} data 所有資料
 * @param {Array} day 某日
 * @param {String} type 資料類型，對應 reducer 的結構
 * @returns 回傳找到的值，如果沒有則 0
 */
export function daycalculate(data, type, day) {
    let todaydata = findData(data, day);
    let result;
    if (type === dataTypes.compeletedRate) {
        let compeleted = todaydata.compeletedTaskNum;
        let total = todaydata.totaltask;
        // 0 / 0 是 NaN
        if (total === 0 && compeleted === 0) return 0;
        if (typeof total === "undefined" || typeof compeleted === "undefined") {
            return 0;
        }
        result = compeleted / total;
        return result;
    }
    return todaydata[type] || 0;
}

/**
 * 回傳 tab 對應的資料
 * @param {Object} data
 * @param {String} tab
 * @returns 資料排序 [week,day,week,day]
 */
export function tab2Data(data, tab) {
    return Description[tab].reduce((p, datatype) => {
        let result;

        if (datatype.timeframe === "week") {
            // 取小數兩位
            result = outputValue(
                datatype.type,
                weeklyType2Data(data, datatype.type)
            );
            const finalresult = Number(convertfixed(result, 2));
            return [...p, finalresult];
        }
        result = outputValue(
            datatype.type,
            daycalculate(data, datatype.type, today)
        );
        return [...p, result];
    }, []);
}
/**
 *
 * @param {String} type
 * @param {Number} value
 * @returns 回傳處理過的數值
 */
export function outputValue(type, value) {
    if (type === dataTypes.compeletedRate) {
        return Math.round(value * 100);
    }
    return value;
}

/**
 * 找到當周的資料
 * @param {Object} data
 * @param {String} dataType
 * @returns 一周的資料陣列
 */
export function findweeklyData(data, dataType) {
    let week = weekDays();
    // 每天的完成率，沒有計算
    let result = [];

    for (let i = 0; i < week.length; i++) {
        let resultData;

        if (dataType === dataTypes.compeletedRate) {
            // 找到當周所有完成率
            resultData = daycalculate(data, dataType, week[i]);
            result.push(resultData);
            continue;
        }
        resultData = findData(data, week[i]);
        result.push(resultData[dataType] || 0);
    }
    const final = result.map((value) => Number(convertfixed(value, 2)));
    return final;
}
/**
 * 找到該天的資料
 * @param {Array} data
 * @param {String} day
 * @returns 回傳物件
 */
function findData(data, day) {
    return data.data.find((el) => el.dataTime.includes(day)) || 0;
}

/**
 * 陣列加總
 * @param {Array} dataArr
 * @returns 加總結果
 */
function datasum(dataArr) {
    return dataArr.reduce((p, n) => p + n, 0);
}

/**
 * 表格當周每日資料
 * @param {Object} data
 * @param {String} tab
 * @returns 每日陣列資料
 */
export function data2Chart(data, tab) {
    let type;

    if (tab === Tabs.TOMATO) {
        type = dataTypes.focusTime;
        return findweeklyData(data, type);
    }
    type = dataTypes.compeletedRate;
    return findweeklyData(data, type);
}
/**
 * 取小數與整數
 * @param {Number} value
 * @param {Number} num 位數
 * @returns 取小數兩位數，整數就取整數
 */
function convertfixed(value, num) {
    return !Number.isNaN(value) && value.toFixed(num).replace(/\.0.\b/g, "");
}
