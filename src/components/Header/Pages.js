import { ReactComponent as TaskIcon } from "@images/Task.svg";
import { ReactComponent as AlarmIcon } from "@images/Alarm.svg";
import { ReactComponent as AnalysisIcon } from "@images/Analysis.svg";

export const Pages = [
    {
        name: "task",
        icon: <TaskIcon />,
        to: "task",
    },
    { name: "alarm", icon: <AlarmIcon />, to: "alarm" },
    {
        name: "analysis",
        icon: <AnalysisIcon />,
        to: "analysis",
    },
];
