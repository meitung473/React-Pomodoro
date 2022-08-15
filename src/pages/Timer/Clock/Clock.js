import { useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { selectorTimer, selectorTodo } from "@redux/selector";
import { MODETIME, TASKMODE } from "@constants/constants";
import {
    SVGComponent,
    StyleGroup,
    Clockface,
    ClockText,
    RectShape,
} from "./Clock.style";

// 萃取需要的 data 就好
const Clock = ({ currentLine }) => {
    const timer = useSelector(selectorTimer);
    const todos = useSelector(selectorTodo);

    const setClock = useMemo(() => {
        let time =
            timer.cachecurrentTime >= 0
                ? timer.cachecurrentTime
                : MODETIME.task;
        let min = parseInt(time / 60, 10);
        let sec = parseInt(time % 60, 10);
        return {
            min,
            sec,
        };
    }, [timer.cachecurrentTime]);

    return (
        <SVGComponent viewBox="0 0 500 500">
            <Clockface
                transform="translate(0 0)"
                $mode={timer?.timermode || TASKMODE}
            >
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                    <circle
                        cx="216"
                        cy="216"
                        r="216"
                        transform="translate(34 34)"
                    />
                </g>
                <StyleGroup transform="translate(50 50)">
                    <circle
                        cx="200"
                        cy="200"
                        r="200"
                        data-clock="small-circle"
                    />
                </StyleGroup>
                <StyleGroup
                    transform="translate(50 450)"
                    $runningLine={currentLine}
                    $isRunning={timer.timerstatus}
                >
                    <circle cx="200" cy="200" r="192.5" data-clock="runner" />
                </StyleGroup>
                <ClockText
                    x="50%"
                    y="52.5%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                >
                    {setClock.min < 10 ? "0" + setClock.min : setClock.min}：
                    {setClock.sec < 10 ? "0" + setClock.sec : setClock.sec}
                </ClockText>

                <foreignObject x="50%" y="60%">
                    <p>
                        {timer.currentOnTaskId &&
                            todos.find(
                                (todo) => todo.id === timer.currentOnTaskId
                            ).content}
                    </p>
                </foreignObject>
                <RectShape rx="7.5" transform="translate(238 10)" />
            </Clockface>
        </SVGComponent>
    );
};
export default Clock;

Clock.propTypes = {
    currentLine: PropTypes.number,
};
