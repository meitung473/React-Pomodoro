import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Triangle = css`
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    cursor: pointer;
`;
const Upper = styled.span`
    ${Triangle}
    border-bottom: 10px solid ${({ theme }) => theme.Warn.inactive};
    margin-right: 6px;
    ${({ $islast }) => $islast && "visibility: hidden;"}
`;
const Downer = styled.span`
    ${Triangle}
    border-top: 10px solid ${({ theme }) => theme.Warn.inactive};
    ${({ $islast }) => $islast && "visibility: hidden;"}
`;
const OrderSlot = styled.div`
    display: flex;
    align-items: center;
`;
const OrderButton = ({ $isfirst, $islast, handleOrder, thisorder }) => {
    return (
        <OrderSlot>
            <Upper $isfirst={$isfirst} onClick={handleOrder(thisorder, -1)} />
            <Downer $islast={$islast} onClick={handleOrder(thisorder, +1)} />
        </OrderSlot>
    );
};
export default OrderButton;

OrderButton.propTypes = {
    $isfirst: PropTypes.bool,
    $islast: PropTypes.bool,
    handleOrder: PropTypes.func,
    thisorder: PropTypes.number,
};
