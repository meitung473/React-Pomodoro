import styled from "styled-components";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { selectorChart } from "@redux/selector";
import useMediaQuery from "@Hooks/useMediaQuery";

import { adjustOpacity, theme } from "@constants/theme";
import { br } from "@constants/device";

import { Tabs, Tab2types } from "@pages/AnalysisPage/type";
import { tab2Data } from "@pages/AnalysisPage/calculate";
import { Page } from "../../Layout";
import AnalysisTable from "./AnalysisTable";
import Chart from "./Chart";

const AnalysisSwitcher = styled.div`
    display: flex;
`;
const AnalysisSwitchTab = styled.label`
    cursor: pointer;
    background-color: #fff;
    flex-grow: 1;
    text-align: center;
    padding: 10px 0px;
`;

const SwitchHandler = styled.input`
    position: absolute;
    z-index: -1;
    opacity: 0;
    &:checked + label {
        background-color: ${({ theme }) =>
            adjustOpacity(theme.primary.Default, 0.15)};
    }
`;
const StyleBody = styled(Page.SubBody)`
    flex: 1 1 auto;
    max-height: 100%;
    background-color: ${({ theme }) =>
        adjustOpacity(theme.primary.Default, 0.15)};
`;
const AnalysisPage = () => {
    const [tab, setTab] = useState(Tabs.TOMATO);
    const data = useSelector(selectorChart);
    const [content, setContent] = useState(tab2Data(data, tab));
    const handleChange = (e) => {
        setTab(() => e.target.id);
    };

    useEffect(() => {
        setContent(tab2Data(data, tab));
    }, [tab, data]);

    const isMd = useMediaQuery(br.md);
    return (
        <Page>
            {isMd && <Page.Header $bg={theme.primary.Tint} />}
            <Page.SubBody>
                <AnalysisSwitcher>
                    <SwitchHandler
                        type="radio"
                        name="analysisOption"
                        id={Tabs.TOMATO}
                        defaultChecked={true}
                        onChange={handleChange}
                    />
                    <AnalysisSwitchTab htmlFor={Tabs.TOMATO}>
                        番茄報表
                    </AnalysisSwitchTab>
                    <SwitchHandler
                        type="radio"
                        name="analysisOption"
                        id={Tabs.TASK}
                        onChange={handleChange}
                    />
                    <AnalysisSwitchTab htmlFor={Tabs.TASK}>
                        任務報表
                    </AnalysisSwitchTab>
                </AnalysisSwitcher>
            </Page.SubBody>
            <StyleBody>
                <AnalysisTable format={Tab2types(tab)} content={content} />
            </StyleBody>
            <StyleBody>
                <Chart tab={tab} />
            </StyleBody>
        </Page>
    );
};
export default AnalysisPage;
