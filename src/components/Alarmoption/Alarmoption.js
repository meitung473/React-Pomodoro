import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectorAlarm } from "@redux/selector";
import { useEffect, useRef } from "react";

const RadioItem = styled.label`
    cursor: pointer;
    position: relative;
    text-indent: 1.5em;
    color: ${({ theme, $alarmstatus }) =>
        $alarmstatus ? theme.text.dark : theme.text.light};
    font-weight: 300;
    &:before {
        content: "";
        position: absolute;
        left: 0;
        border-radius: 50%;
        height: 1em;
        width: 1em;
        border: 2px solid
            ${({ theme, $select }) =>
                $select ? theme.primary.Default : theme.Warn.inactive};
        background-color: ${({ theme, $select }) =>
            $select ? theme.primary.Default : "none"};
    }

    & > input {
        appearance: none;
    }
`;

const Alarmoption = ({
    group,
    content,
    handleChange,
    $fill,
    index,
    callback,
}) => {
    const alarm = useSelector(selectorAlarm);

    return (
        <RadioItem $alarmstatus={alarm.HasAlarm} $select={$fill}>
            <input
                type="radio"
                name={group}
                disabled={!alarm.HasAlarm}
                onChange={() => {
                    if (!alarm.HasAlarm) return;
                    handleChange(group, index, callback);
                }}
            />
            {content}
        </RadioItem>
    );
};

export default Alarmoption;
