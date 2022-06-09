import styled from "styled-components";
import { selectorTimer, selectorTodo } from "../../redux/selector";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { TASKMODE } from "@constants/constants";

const SVGComponent = styled.svg`
    max-width: 100%;
`;

const StyleGroup = styled.g`
    stroke-linejoin: round;
    stroke-width: 3px;
    fill: none;
    [data-clock] {
        stroke-width: 5px;
    }
    [data-clock="runner"] {
        opacity: 0.5;
        stroke-width: 50px;
        transform: rotate(-90deg);
        stroke-dasharray: ${2 * Math.PI * 192} ${2 * Math.PI * 192};
        stroke-dashoffset: ${(props) => props.$runningLine + "px"};
        transition: stroke-dashoffset
            ${(props) => (props.$isRunning ? "1s" : "0s")} linear;
    }
`;

const RectShape = styled.rect`
    width: 15px;
    height: 75px;
`;
const ClockText = styled.text`
    font-size: 80px;
    font-weight: 700;
`;
const Clockface = styled.g`
    fill: ${({ theme }) => theme.greyscale.black_0};
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.4));
    ${ClockText},${RectShape} {
        fill: ${({ $mode, theme }) =>
            $mode === TASKMODE
                ? theme.primary.Default
                : theme.secondary.Default};
    }
    [data-clock="small-circle"] {
        stroke: ${({ $mode, theme }) =>
            $mode === TASKMODE
                ? theme.primary.Default
                : theme.secondary.Default};
    }
    [data-clock="runner"] {
        stroke: ${({ $mode, theme }) =>
            $mode === TASKMODE ? theme.primary.Tint : theme.secondary.Tint};
    }
    foreignObject {
        text-align: center;
        width: 300px;
        height: 85px;
        transform: translate(-150px, 0px);
        p {
            color: ${({ $mode, theme }) =>
                $mode === TASKMODE
                    ? theme.primary.Default
                    : theme.secondary.Default};
            font-size: 24px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
`;

const Clock = ({ currentLine }) => {
    const timer = useSelector(selectorTimer);
    const todos = useSelector(selectorTodo);

    const setClock = useMemo(() => {
        let time = timer.cachecurrentTime >= 0 ? timer.cachecurrentTime : 25;
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
