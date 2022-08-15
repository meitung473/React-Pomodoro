import styled from "styled-components";
import { TASKMODE, MODETIME } from "@constants/constants";
import { br } from "@constants/device";

const TimerContainer = styled.main`
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
`;
const ButtonGroup = styled.div`
    box-sizing: border-box;
    padding: 8px 20px;
    background-color: ${({ $mode, theme }) =>
        $mode === TASKMODE ? theme.primary.Default : theme.secondary.Default};
    border-radius: 10px;
    svg {
        flex-basis: 100px;
        flex-grow: 1;
        height: 32px;
        margin: 0 15px;
        box-sizing: border-box;
        cursor: pointer;
    }
`;

const TimerControll = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    max-width: 400px;
    ${br.md} {
        max-width: 500px;
    }
`;
