import styled from "styled-components";
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

export { SVGComponent, StyleGroup, Clockface, ClockText, RectShape };
