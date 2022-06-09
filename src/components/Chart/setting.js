import { adjustOpacity, theme } from "@constants/theme";
import { Tabs } from "@pages/AnalysisPage/type";

export const custom_canvas_background_color = {
    id: "custom_canvas_background_color",
    beforeDraw: (chart) => {
        const ctx = chart.canvas.getContext("2d");
        const chartArea = chart.chartArea;
        ctx.save();
        // 新的圖層，渲染方式
        // ctx.globalCompositeOperation = "destination-over";
        ctx.fillStyle = theme.greyscale.black_0;
        ctx.shadowColor = adjustOpacity(theme.greyscale.black_1000, 0.5);
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 5;
        ctx.fillRect(
            chartArea.left,
            chartArea.top,
            chartArea.right - chartArea.left,
            chartArea.bottom - chartArea.top
        );
        ctx.fill();
        ctx.restore();
    },
};

const plugins = (tab) => ({
    legend: {
        display: false,
    },
    tooltip: {
        callbacks: {
            label: (context) => {
                let label = context.dataset.label;
                let value = context.parsed.y;
                let unit = "";
                if (label === "專注時間") {
                    unit = "小時";
                } else {
                    unit = "%";
                }
                return `${label} : ${value} ${unit}`;
            },
        },
    },
    custom_canvas_background_color,
    title: {
        display: true,
        text: () => {
            if (tab === Tabs.TASK) {
                return "任務達成率";
            }
            return "專注時間";
        },
    },
});

// X 軸
const scaleX_timeset = {
    unit: "day",
    // x 軸顯示的文字格式
    displayFormats: {
        day: "MMM Do",
    },
    // tooltip 上的時間格式
    tooltipFormat: "MMM Do",
    round: "day",
};
const scaleX_ticks = {
    font: {
        size: 10,
    },
    color: theme.text.dark,
};
// Y 軸
const scaleY_ticks = (tab) => ({
    color: theme.primary.Default,
    callback: function (value, index, ticks) {
        if (tab === Tabs.TASK) {
            return value + "%";
        }
        return value;
    },
});
/**
 * 設定，根據 tab 改變
 */
export const options = (tab) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: plugins(tab),
    scales: {
        x: {
            type: "time",
            time: scaleX_timeset,
            grid: {
                display: false,
            },
            ticks: scaleX_ticks,
        },
        y: {
            ticks: scaleY_ticks(tab),
            beginAtZero: true,

            // todo : 根據單位來換算
            suggestedMax: yaxisValueRange(tab),
            grid: {
                color: adjustOpacity(theme.primary.Default, 0.4),
            },
        },
    },
});
function yaxisValueRange(tab) {
    let max = 0;
    if (tab === Tabs.TOMATO) {
        max = 25;
        return max;
    }
    max = 100;
    return max;
}
// 樣式
export const style = {
    marginBottom: "30px",
    width: "100%",
    padding: "0 .3em",
};
