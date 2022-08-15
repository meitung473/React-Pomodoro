import React, { useState } from "react";
import styled from "styled-components";
import { SubTitle, Input, Body, DefaultFooter } from "../Modal.style";
import { useDispatch } from "react-redux";
import { useModal } from "@components/Modal/ModalcontextPackage";
import { addTodoThunk } from "@redux/reducers/todo/slice";

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
export default function AddModal() {
    const dispatch = useDispatch();
    const { setModalName } = useModal();
    const [content, setContent] = useState("");
    const [tomato, setTomato] = useState(1);

    const [errorMessage, setErrorMessage] = useState("");

    const event = () => {
        if (!content) {
            setErrorMessage("不能為空白");
            return;
        }
        dispatch(
            addTodoThunk({
                todo: {
                    content,
                    tomato,
                },
                chart: {
                    key: "totaltask",
                    value: 1,
                },
            })
        );
        setContent("");
        setErrorMessage("");
        setModalName(null);
    };
    return (
        <>
            <Body>
                <SubTitle>
                    任務名稱
                    <ErrorMessage> {errorMessage}</ErrorMessage>
                </SubTitle>
                <Input
                    type="text"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    onFocus={() => {
                        setErrorMessage("");
                    }}
                />

                <SubTitle>番茄數</SubTitle>
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
            </Body>
            <DefaultFooter callback={event} />
        </>
    );
}
