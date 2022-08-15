import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectorAlarm } from "@redux/selector";
import PropTypes from "prop-types";
import { setupType } from "@redux/reducers/alarm/slice";
import { createSelector } from "@reduxjs/toolkit";

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
const selectAlarmHadAlarm = createSelector(
    selectorAlarm,
    (alarm) => alarm.hadAlarm
);

const Alarmoption = ({
    group,
    content,
    $fill,
    index,
    setCurrentPlay,
    setTimesupPlay,
}) => {
    const hadalarm = useSelector(selectAlarmHadAlarm);
    const dispatch = useDispatch();
    return (
        <RadioItem $alarmstatus={hadalarm} $select={$fill}>
            <input
                type="radio"
                name={group}
                disabled={!hadalarm}
                onChange={() => {
                    if (!hadalarm) return;
                    dispatch(setupType(group, index));
                    setCurrentPlay(index);
                    setTimesupPlay(null);
                }}
            />
            {content}
        </RadioItem>
    );
};

Alarmoption.propTypes = {
    group: PropTypes.string,
    content: PropTypes.string,
    handleChange: PropTypes.func,
    $fill: PropTypes.bool,
    index: PropTypes.number,
    stateSetter: PropTypes.func,
};

export default Alarmoption;
