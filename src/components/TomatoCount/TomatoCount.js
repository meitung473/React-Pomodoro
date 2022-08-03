import { MODETIME, TASKMODE } from "@constants/constants";
import { selectorTimer } from "@redux/selector";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

const TomatoSlotContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4em;
    flex-direction: column;
`;

const TomatoSlot = styled.span`
    position: relative;
    overflow: hidden;
    display: inline-block;
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: ${({ $fill, theme, $timer }) =>
        $fill
            ? $timer.timermode === TASKMODE
                ? theme.primary.Default
                : theme.secondary.Default
            : theme.Warn.inactive};

    ${({ $current, theme, $timer, $circleheight }) => {
        if ($current) {
            const pos = () => {
                if ($timer.currentOnTaskId || $timer.timerstatus) {
                    if ($circleheight === 0) return 0;
                    return 100 * $circleheight;
                }
                return 100;
            };
            const transitionstatus = $timer.timerstatus ? "1s" : "0s";
            return `
                &:nth-of-type(${$current}):before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background: ${theme.Warn.inactive};
                transition: transform ${transitionstatus} linear;
                transform: translateY(${pos()}%);
            }
        `;
        }
    }}
`;

const TomatoCount = ({ fill }) => {
    const timer = useSelector(selectorTimer);
    return (
        <TomatoSlotContainer>
            {Array.from({ length: 5 }, (_, i) => {
                if (fill === i + 1)
                    return (
                        <TomatoSlot
                            key={"tomatocount" + i}
                            $fill
                            $timer={timer}
                            // 剩餘時間 / 模式時間
                            $circleheight={
                                timer.cachecurrentTime /
                                MODETIME[timer.timermode]
                            }
                            $current={fill}
                        />
                    );
                if (fill > i + 1) {
                    return (
                        <TomatoSlot
                            key={"tomatocount" + i}
                            $fill
                            $timer={timer}
                        />
                    );
                }
                return <TomatoSlot key={"tomatocount" + i} />;
            })}
        </TomatoSlotContainer>
    );
};
export default TomatoCount;

TomatoCount.propTypes = {
    fill: PropTypes.number,
};
