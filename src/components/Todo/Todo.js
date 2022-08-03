import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { selectorEditingTodo, selectorTimer } from "@redux/selector";
import { editTodo, setnoweditTodo } from "@redux/reducers/todo";

import { ReactComponent as Pause } from "@images/Pause.svg";
import { ReactComponent as Start } from "@images/Start.svg";
import { ReactComponent as Delete } from "@images/DeleteTask.svg";
import { CheckButton, OrderButton } from "..";
import { cleanTaskTodo } from "@redux/reducers/todo/slice";
import { initializeTimer } from "@redux/reducers/timer/slice";
import {
    List,
    ItemWrapper,
    Content,
    Header,
    Body,
    Edit,
    Footer,
    TomatoConatiner,
    TomatoSlot,
} from "./Todo.style";

const TodoContext = createContext();
function Todo({ children }) {
    return <List>{children}</List>;
}
function Tomato() {
    const { id, tomatoNum, isCompeleted } = useContext(TodoContext);
    return (
        <TomatoConatiner isCompeleted={isCompeleted}>
            {Array.from({ length: 5 }).map((e, i) => {
                if (i < tomatoNum) return <TomatoSlot key={id + i} $fill />;
                return <TomatoSlot key={id + i} />;
            })}
        </TomatoConatiner>
    );
}
// 避免整格 selector 全部更新導致 re-render，這邊切成碎片的
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

    const handlePlay = () => {
        dispatch(initializeTimer(id, tomatoNum));
    };
    const handleDelete = () => {
        dispatch(cleanTaskTodo(id));
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
                        <Start onClick={handlePlay} />
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

Todo.propTypes = {
    children: PropTypes.array,
};
InCompeletedItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        tomatoNum: PropTypes.number,
        isCompeleted: PropTypes.bool,
        createdAt: PropTypes.string,
    }),
    isOrder: PropTypes.bool,
    isfirst: PropTypes.bool,
    islast: PropTypes.bool,
    handleOrder: PropTypes.func,
    thisorder: PropTypes.number,
};

CompeletedItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.string,
        content: PropTypes.string,
        tomatoNum: PropTypes.number,
        isCompeleted: PropTypes.bool,
        createdAt: PropTypes.string,
    }),
};
