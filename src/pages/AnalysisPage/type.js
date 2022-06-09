// tab name
export const Tabs = {
    TASK: "taskTab",
    TOMATO: "tomatoTab",
};
// state data name
export const dataTypes = {
    focusTime: "focusTime",
    tomatoNum: "tomatoNum",
    compeletedRate: "compeletedRate",
    compeletedTaskNum: "compeletedTaskNum",
};

// 對應資料的 title & unit
export const Description = {
    [Tabs.TOMATO]: [
        {
            timeframe: "week",
            type: dataTypes.focusTime,
            unit: "hr",
            description: "本週專注時間",
        },
        {
            timeframe: "day",
            type: dataTypes.focusTime,
            unit: "hr",
            description: "今日專注時間",
        },
        {
            timeframe: "week",
            type: dataTypes.tomatoNum,
            unit: "顆",
            description: "本週番茄數",
        },
        {
            timeframe: "day",
            type: dataTypes.tomatoNum,
            unit: "顆",
            description: "今日番茄數",
        },
    ],
    [Tabs.TASK]: [
        {
            timeframe: "week",
            type: "compeletedTaskNum",
            unit: "項",
            description: "本週任務達成數",
        },
        {
            timeframe: "day",
            type: "compeletedTaskNum",
            unit: "項",
            description: "今日任務達成數",
        },
        {
            timeframe: "week",
            type: dataTypes.compeletedRate,
            unit: "%",
            description: "本週任務達成率",
        },
        {
            timeframe: "day",
            type: "compeletedRate",
            unit: "%",
            description: "今日任務達成率",
        },
    ],
};

/**
 * 對應按鈕(tab) 回傳資料敘述(description)
 * @param {String} tab 哪個表格
 * @returns object
 */
export function Tab2types(tab) {
    return Description[tab];
}
