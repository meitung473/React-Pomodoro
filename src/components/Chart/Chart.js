import { Line } from "react-chartjs-2";
import "chartjs-adapter-moment";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    TimeScale,
} from "chart.js";
import { useSelector } from "react-redux";
import { custom_canvas_background_color, options, style } from "./setting";
import { data2Chart, weekDays } from "@pages/AnalysisPage/calculate";
import { Tabs } from "@pages/AnalysisPage/type";

import { selectorChart } from "@redux/selector";
import { theme } from "@constants/theme";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    TimeScale,
    // 改變 chartArea 顏色
    custom_canvas_background_color
);

// 資料格式設定
const dataset = (labels, itemlabel, data) => ({
    // x 軸
    labels: labels,
    datasets: [
        {
            label: label2value(itemlabel),
            data: outputValue(itemlabel, data),
            backgroundColor: theme.primary.Dark,
            borderWidth: 2,
            borderColor: theme.primary.Dark,
        },
    ],
});

function outputValue(tab, datas) {
    if (tab === Tabs.TASK) {
        return datas.map((data) => Math.round(data * 100));
    }
    return datas;
}

function label2value(itemlabel) {
    if (itemlabel === Tabs.TOMATO) {
        return "專注時間";
    }
    return "任務完成率";
}

const Chart = ({ tab }) => {
    const data = useSelector(selectorChart);
    return (
        <Line
            data={dataset(weekDays(), tab, data2Chart(data, tab))}
            options={options(tab)}
            style={style}
        />
    );
};
export default Chart;
