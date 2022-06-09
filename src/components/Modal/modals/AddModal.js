import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { updateChart } from "@redux/reducers/chart";
import { addTodo } from "@redux/reducers/todo";

import { Modal } from "../..";
import { ModalContext } from "@constants/context";

const TomatoContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
    padding-right: 5px;
`;
const TomatoSlot = styled.span`
    position: relative;
    overflow: hidden;
    display: inline-block;
    box-sizing: border-box;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    border-color: #ccc;
    cursor: pointer;
    & + & {
        margin-left: 0.1em;
    }
    ${({ $tomato, theme }) => {
        let result = "";
        while ($tomato > 0) {
            result += `&:nth-of-type(${$tomato}),`;
            $tomato--;
        }
        result = result.replace(/,$/, "");
        result += `{
            border-color: ${theme.primary.Default};
            background-color: ${theme.primary.Default};
        }`;
        return result;
    }}
`;
const ErrorMessage = styled.span`
    font-size: 10px;
    font-weight: lighter;
    color: ${({ theme }) => theme.Warn.active};
`;
function AddModal() {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");
    const [tomato, setTomato] = useState(1);
    const { closeModal } = useContext(ModalContext);
    const [errorMessage, setErrorMessage] = useState("");
    const event = () => {
        if (!content) {
            setErrorMessage("不能為空白");
            return;
        }
        dispatch(addTodo(content, tomato));
        dispatch(updateChart("totaltask", 1));
        setContent("");
        setErrorMessage("");
        closeModal();
    };

    return (
        <Modal.Wrapper>
            <Modal.Title>新增任務</Modal.Title>
            <Modal.Body>
                <Modal.SubTitle>
                    任務名稱
                    <ErrorMessage> {errorMessage}</ErrorMessage>
                </Modal.SubTitle>
                <Modal.Input
                    type="text"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    onFocus={() => {
                        setErrorMessage("");
                    }}
                />

                <Modal.SubTitle>番茄數</Modal.SubTitle>
                <TomatoContainer>
                    {Array.from({ length: 5 }, (_, i) => (
                        <TomatoSlot
                            key={"tomato" + i}
                            onClick={() => {
                                setTomato(i + 1);
                            }}
                            $tomato={tomato}
                        />
                    ))}
                </TomatoContainer>
            </Modal.Body>
            <Modal.DefaultFooter callback={event} />
        </Modal.Wrapper>
    );
}

export default AddModal;
