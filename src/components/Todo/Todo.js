import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import { selectorEditingTodo, selectorTimer } from "@redux/selector";
import { deleteTodo, editTodo, setnoweditTodo } from "@redux/reducers/todo";
import { setTomatoNum } from "@redux/reducers/timer";

import { br } from "@constants/device";
import { TimerContext } from "@constants/context";

import { ReactComponent as Pause } from "@images/Pause.svg";
import { ReactComponent as Start } from "@images/Start.svg";
import { ReactComponent as Delete } from "@images/DeleteTask.svg";
import { CheckButton, OrderButton } from "..";
import { adjustOpacity } from "@constants/theme";

const List = styled.ul`
    overflow-x: hidden;
    height: calc(100% - 2.5em);
    margin-top: auto;
    padding: 0 2em;
    ::-webkit-scrollbar {
        width: 0.4em;
    }
    ::-webkit-scrollbar-track {
        background-color: ${({ theme }) => theme.text.light};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb {
        background: ${({ theme }) => adjustOpacity(theme.text.dark, 0.25)};
        border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) => adjustOpacity(theme.text.dark, 0.5)};
    }
    ${br.md} {
        padding: 0 0.5em;
    }
`;
const ItemWrapper = styled.li`
    display: flex;
    position: relative;
    padding: 0.5em 0;
    align-items: flex-start;
    &:not(:last-child):after {
        content: "";
        border-bottom: 1px solid ${({ theme }) => theme.text.light};
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;
const Header = styled.span`
    display: flex;
    align-items: center;
`;
const Body = styled.div`
    flex-grow: 1;
    display: flex;

    justify-content: flex-start;
`;
const Content = styled.p`
    position: relative;
    margin: 0;
    padding: 0 0.4em;
    display: flex;
    word-break: break-word;
`;
const Edit = styled.textarea`
    box-sizing: border-box;
    width: 100%;
    resize: none;
    border: 1px solid ${({ theme }) => theme.primary.Default};
    outline: none;
    height: ${({ $height }) => {
        return $height + "px";
    }};
    font-size: 1em;
    overflow: hidden;
    font-family: "Noto Sans TC", sans-serif;
`;

const Footer = styled.span`
    display: flex;
    column-gap: 4px;
    margin-left: 0.2em;
    align-items: center;
    svg {
        cursor: pointer;
    }
    [data-name="bg"] {
        ${({ theme, $active }) =>
            $active &&
            `
            fill: ${theme.Warn.active};
        `}
    }
`;

const TomatoConatiner = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`;

const TomatoSlot = styled.span`
    position: relative;
    overflow: hidden;
    display: inline-block;
    box-sizing: border-box;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    & + & {
        margin-left: 0.1em;
    }
    background-color: ${({ $fill, theme }) =>
        $fill ? theme.primary.Default : theme.Warn.inactive};
`;

const TodoContext = createContext();
function Todo({ children }) {
    return <List>{children}</List>;
}
function Tomato() {
    const { id, tomatoNum, isCompeleted } = useContext(TodoContext);
    // 是不是在任務上?
    return (
        <TomatoConatiner isCompeleted={isCompeleted}>
            {Array.from({ length: 5 }).map((e, i) => {
                if (i < tomatoNum) return <TomatoSlot key={id + i} $fill />;
                return <TomatoSlot key={id + i} />;
            })}
        </TomatoConatiner>
    );
}
function InCompeletedItem({
    todo,
    isOrder,
    isfirst,
    islast,
    handleOrder,
    thisorder,
}) {
    const timer = useSelector(selectorTimer);
    const dispatch = useDispatch();
    const { initialTimer } = useContext(TimerContext);
    const { id, content, tomatoNum, isCompeleted, createdAt } = todo;

    const nowEditTodoId = useSelector(selectorEditingTodo);
    const [isEdit, setisEdit] = useState(false);
    useEffect(() => {
        //讓編輯的項目只能一個
        if (isEdit && nowEditTodoId !== id) {
            setisEdit(false);
        }
    }, [isEdit, nowEditTodoId, id]);
    // const [editContent, setEditContent] = useState("");

    const Play = () => {
        initialTimer(id);
        dispatch(
            setTomatoNum({
                task: tomatoNum,
                rest: tomatoNum,
            })
        );
    };
    const handleDelete = () => {
        dispatch(deleteTodo(id));
        if (timer.currentOnTaskId === id) {
            initialTimer(null);
        }
    };

    const handleDoubleClickEdit = () => {
        if (isOrder) return;
        if (!isCompeleted) {
            setisEdit(true);
            dispatch(setnoweditTodo(id));
            // setEditContent(content);
        }
    };

    return (
        <TodoContext.Provider
            value={{
                id,
                tomatoNum,
                isCompeleted,
                setisEdit,
                content,
                dispatch,
                // setEditContent,
            }}
        >
            <ItemWrapper>
                <Header>
                    {isOrder ? (
                        <OrderButton
                            $isfirst={isfirst}
                            $islast={islast}
                            handleOrder={handleOrder}
                            thisorder={thisorder}
                        />
                    ) : (
                        <CheckButton
                            id={id}
                            isCompeleted={isCompeleted}
                            initialTimer={initialTimer}
                            createdAt={createdAt}
                        />
                    )}
                </Header>
                <Body>
                    {isEdit ? (
                        <EditContent />
                    ) : (
                        <Content onDoubleClick={handleDoubleClickEdit}>
                            {content}
                        </Content>
                    )}
                </Body>
                <Footer $active={timer.currentOnTaskId === id}>
                    <Tomato />
                    {!isOrder && <Delete onClick={handleDelete} />}
                    {!isOrder &&
                        timer.currentOnTaskId === id &&
                        timer.timerstatus && <Pause />}
                    {!isOrder &&
                        timer.currentOnTaskId === id &&
                        !timer.timerstatus && <Start />}
                    {!isOrder && timer.currentOnTaskId !== id && (
                        <Start onClick={Play} />
                    )}
                </Footer>
            </ItemWrapper>
        </TodoContext.Provider>
    );
}

function CompeletedItem({ todo }) {
    const { id, content, tomatoNum, isCompeleted, createdAt } = todo;
    return (
        <TodoContext.Provider value={{ id, tomatoNum, isCompeleted }}>
            <ItemWrapper>
                <Header>
                    <CheckButton
                        isCompeleted={isCompeleted}
                        id={id}
                        createdAt={createdAt}
                    />
                </Header>
                <Body>
                    <Content>{content}</Content>
                </Body>
            </ItemWrapper>
        </TodoContext.Provider>
    );
}

function EditContent() {
    const { id, setisEdit, content, dispatch } = useContext(TodoContext);

    const [height, setHeight] = useState(null);
    const [editcontent, seteditcontent] = useState(content);
    const heightref = useCallback((node) => {
        if (node !== null) {
            setHeight(node.scrollHeight);
        }
    }, []);
    return (
        <Edit
            ref={heightref}
            $height={height}
            autoFocus={true}
            onChange={(e) => {
                setHeight(heightref.scrollHeight);
                seteditcontent(e.target.value);
            }}
            onBlur={() => {
                console.log(editcontent);
                if (editcontent) {
                    dispatch(editTodo(id, editcontent));
                    setisEdit(false);
                    return;
                }
                setisEdit(false);
                alert("任務不能為空白!");
            }}
            defaultValue={content}
        />
    );
}
Todo.InCompeletedItem = InCompeletedItem;
Todo.CompeletedItem = CompeletedItem;
export default Todo;
