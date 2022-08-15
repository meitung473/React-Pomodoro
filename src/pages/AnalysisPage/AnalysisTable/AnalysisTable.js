import styled from "styled-components";
import PropTypes from "prop-types";

import { adjustOpacity } from "@constants/theme";

const Container = styled.div`
    display: flex;
    flex-flow: wrap row;
    height: 100%;
    align-content: center;
    row-gap: 10px;
`;
const Item = styled.div`
    width: 50%;
    text-align: center;
    &:nth-child(odd) {
        color: ${({ theme }) => theme.primary.Default};
    }
    &:nth-child(even) {
        color: ${({ theme }) => theme.Warn.active};
    }
`;
const Content = styled.strong`
    font-size: 28px;
`;
const Unit = styled.span`
    font-size: 16px;
    margin-left: 6px;
`;
const Description = styled.p`
    font-size: 14px;
    color: ${({ theme }) => adjustOpacity(theme.text.dark, 0.5)};
    margin-top: 0.4em;
`;

const TextItem = ({ unit, description, value }) => {
    return (
        <Item>
            <Content>{value}</Content>
            <Unit>{unit}</Unit>
            <Description>{description}</Description>
        </Item>
    );
};

const AnalysisTable = ({ format, content }) => {
    // [weely,day,weekly,day]
    return (
        <Container>
            {format.map((el, i) => (
                <TextItem
                    key={el.description}
                    unit={el.unit}
                    description={el.description}
                    value={content[i]}
                />
            ))}
        </Container>
    );
};

export default AnalysisTable;

TextItem.propTypes = {
    unit: PropTypes.string,
    description: PropTypes.string,
    value: PropTypes.number,
};
AnalysisTable.propTypes = {
    format: PropTypes.array,
    content: PropTypes.array,
};
