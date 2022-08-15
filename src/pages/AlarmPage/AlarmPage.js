import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { selectorAlarm } from "@redux/selector";
import { hasAlarm, setAlarm } from "@reducers/alarm";
import { adjustOpacity, theme } from "@constants/theme";
import useMediaQuery from "@Hooks/useMediaQuery";
import { br } from "@constants/device";
import { RESTMODE, TASKMODE } from "@constants/constants";
import alarmPackage from "../../data/sound.json";

import { Page } from "../../Layout";
import Alarmoption from "./Alarmoption";
import { useAudio } from "@Hooks/useAudio";
import AudioController from "@components/Audio/AudioController";
import { toggleStatus } from "@redux/reducers/alarm/slice";

const SwitchWrapper = styled.div`
    box-sizing: border-box;
    padding: 0px 1em;
    margin: 1em 0;
    display: flex;
    align-items: center;
`;
const Switcher = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
    &:checked + label {
        box-shadow: inset 20px 0 0 ${({ theme }) => theme.Warn.active};
    }
    &:checked + label:before {
        transform: translateX(18px);
    }
`;
const SwitchTrack = styled.label`
    position: relative;
    margin-left: 0.5em;
    width: 36px;
    height: 20px;
    background-color: ${({ theme }) => theme.text.light};
    border-radius: 10px;
    box-shadow: inset 0px 0 0 ${({ theme }) => theme.text.light};
    transition: background-color 0.3s ease-in-out, box-shadow 0.2s ease-in-out;
    box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    &:before {
        content: "";
        position: absolute;
        top: 1px;
        transform: translateX(0px);
        width: 18px;
        height: 18px;
        background-color: ${({ theme }) => theme.greyscale.black_0};
        box-shadow: 0 0px 4px
            ${({ theme }) => adjustOpacity(theme.greyscale.black_1000, 0.4)};
        border-radius: 50%;
        transition: transform 0.3s ease-in-out;
    }
`;
const Title = styled.h3`
    color: ${({ theme, alarmstatus }) =>
        alarmstatus ? theme.text.dark : theme.text.light};
    font-weight: 400;
`;

const RadioGroup = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 1em;
    margin-top: 1em;
`;

const SwitcherBody = styled(Page.SubBody)`
    height: 0.5em;
`;
const StyleBody = styled(Page.SubBody)`
    padding: 0 1em;
`;

// 這裡直接取就好
const AlarmPage = ({ setCurrentPlay, setTimesupPlay }) => {
    const alarm = useSelector(selectorAlarm);

    const dispatch = useDispatch();
    const isMd = useMediaQuery(br.md);
    // hadAlarm 太多要減少
    return (
        <Page>
            {isMd && <Page.Header $bg={theme.primary.Tint} />}
            <SwitcherBody>
                <SwitchWrapper>
                    <Title alarmstatus={alarm.hadAlarm}>鬧鐘提醒</Title>
                    <Switcher
                        id="alarmswitch"
                        type="checkbox"
                        defaultChecked={alarm.hadAlarm}
                        onChange={() => {
                            dispatch(toggleStatus());
                            setCurrentPlay(null);
                            setTimesupPlay(null);
                        }}
                    />
                    <SwitchTrack htmlFor="alarmswitch" />
                </SwitchWrapper>
            </SwitcherBody>
            <StyleBody>
                <Title alarmstatus={alarm.hadAlarm}>工作結束鬧鐘</Title>
                <RadioGroup>
                    {alarmPackage.data.map(({ name }, i) => {
                        return (
                            <Alarmoption
                                key={name}
                                group={TASKMODE}
                                index={i}
                                content={name}
                                $fill={i === alarm.type[TASKMODE]}
                                setCurrentPlay={setCurrentPlay}
                                setTimesupPlay={setTimesupPlay}
                            />
                        );
                    })}
                </RadioGroup>
            </StyleBody>
            <StyleBody>
                <Title alarmstatus={alarm.hadAlarm}>休息結束鬧鐘</Title>
                <RadioGroup>
                    {alarmPackage.data.map(({ name }, i) => {
                        return (
                            <Alarmoption
                                key={name}
                                group={RESTMODE}
                                index={i}
                                content={name}
                                $fill={i === alarm.type[RESTMODE]}
                                setCurrentPlay={setCurrentPlay}
                                setTimesupPlay={setTimesupPlay}
                            />
                        );
                    })}
                </RadioGroup>
            </StyleBody>
        </Page>
    );
};
export default AlarmPage;
