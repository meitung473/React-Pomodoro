import { useRef, useState } from "react";
import styled from "styled-components";
import { Alarmoption, Page } from "@components";
import { useDispatch, useSelector } from "react-redux";
import { selectorAlarm } from "@redux/selector";
import { hasAlarm, setAlarm } from "@reducers/alarm";
import { adjustOpacity, theme } from "@constants/theme";
import useMediaQuery from "@Hooks/useMediaQuery";
import { br } from "@constants/device";
import { RESTMODE, TASKMODE } from "@constants/constants";
import alarmPackage from "../../data/sound.json";

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

const AlarmPage = () => {
    const alarm = useSelector(selectorAlarm);

    // 預設
    const [taskAlarm, setTaskAlarm] = useState(alarm.alarmType.task);
    const [restAlarm, setRestAlarm] = useState(alarm.alarmType.rest);

    const dispatch = useDispatch();
    const isMd = useMediaQuery(br.md);

    const audioref = useRef();
    const handleChange = (group, id, cb) => {
        dispatch(setAlarm(group, id));
        audioref.current.src =
            process.env.PUBLIC_URL + alarmPackage.find((_, i) => id === i).path;
        if (alarm.HasAlarm && !alarm.alarmrang) {
            audioref.current.play();
        }
        cb(id);
    };

    return (
        <Page>
            {isMd && <Page.Header $bg={theme.primary.Tint} />}
            <SwitcherBody>
                <SwitchWrapper>
                    <Title alarmstatus={alarm.HasAlarm}>鬧鐘提醒</Title>
                    <Switcher
                        id="alarmswitch"
                        type="checkbox"
                        defaultChecked={alarm.HasAlarm}
                        onChange={() => {
                            dispatch(hasAlarm(!alarm.HasAlarm));
                        }}
                    />
                    <SwitchTrack htmlFor="alarmswitch" />
                </SwitchWrapper>
            </SwitcherBody>
            <StyleBody>
                <Title alarmstatus={alarm.HasAlarm}>工作結束鬧鐘</Title>
                <RadioGroup>
                    {alarmPackage.map(({ name, path }, i) => {
                        if (i === taskAlarm)
                            return (
                                <Alarmoption
                                    key={TASKMODE + i}
                                    group={TASKMODE}
                                    index={i}
                                    content={name}
                                    handleChange={handleChange}
                                    callback={setTaskAlarm}
                                    $fill
                                />
                            );
                        return (
                            <Alarmoption
                                key={TASKMODE + i}
                                group={TASKMODE}
                                index={i}
                                content={name}
                                handleChange={handleChange}
                                callback={setTaskAlarm}
                            />
                        );
                    })}
                </RadioGroup>
            </StyleBody>
            <StyleBody>
                <Title alarmstatus={alarm.HasAlarm}>休息結束鬧鐘</Title>
                <RadioGroup>
                    {alarmPackage.map(({ name }, i) => {
                        if (i === restAlarm)
                            return (
                                <Alarmoption
                                    key={RESTMODE + i}
                                    group={RESTMODE}
                                    index={i}
                                    content={name}
                                    handleChange={handleChange}
                                    callback={setRestAlarm}
                                    $fill
                                />
                            );
                        return (
                            <Alarmoption
                                key={RESTMODE + i}
                                group={RESTMODE}
                                index={i}
                                content={name}
                                handleChange={handleChange}
                                callback={setRestAlarm}
                            />
                        );
                    })}
                </RadioGroup>
            </StyleBody>

            <audio ref={audioref} preload="metadata" />
        </Page>
    );
};
export default AlarmPage;
