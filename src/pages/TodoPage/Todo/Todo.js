import { selectorTimer } from "@redux/selector";
import React, {
    useMemo,
    useState,
    useLayoutEffect,
    useRef,
    useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    cleanTaskTodo,
    editingTodo,
    updateTodoContent,
} from "@redux/reducers/todo/slice";
import { initializeTimer } from "@redux/reducers/timer/slice";
import {
    ItemWrapper,
    Content,
    Header,
    Body,
    Footer,
    TomatoConatiner,
    TomatoSlot,
} from "./Todo.style";
import { ReactComponent as Pause } from "@images/Pause.svg";
import { ReactComponent as Start } from "@images/Start.svg";
import { ReactComponent as Delete } from "@images/DeleteTask.svg";
import useToggle from "@Hooks/useToggle";
import { createSelector } from "@reduxjs/toolkit";
import OrderButton from "./OrderButton";
import CheckButton from "./CheckButton";

function Todo({ todo, isorder, NowEditingId }) {
    const { id, content, tomatoNum, isCompeleted, createdAt } = todo;
    const { open: isEdit, ToggleHandler: ToggleEdit } = useToggle(false);
    useEffect(() => {
        //讓編輯的項目只能一個
        if (isEdit && NowEditingId !== id) {
            ToggleEdit(false);
        }
    }, [isEdit, NowEditingId]);

    const order = useMemo(() => {
        if (isCompeleted) return null;
        if (!isorder) return null;
        return <OrderButton id={id} />;
    }, [isCompeleted, isorder]);

    const footer = useMemo(() => {
        if (isCompeleted) return null;
        const renderTomatoCount = (
            <Tomato id={id} tomatoNum={tomatoNum} isCompeleted={isCompeleted} />
        );

        return (
            <TodoFooter
                id={id}
                tomatoNum={tomatoNum}
                renderTomatoCount={renderTomatoCount}
                isorder={isorder}
            />
        );
    }, [isCompeleted, isorder]);
    return (
        <ItemWrapper>
            <Header>
                {isorder ? (
                    order
                ) : (
                    <CheckButton
                        isCompeleted={isCompeleted}
                        id={id}
                        createdAt={createdAt}
                    />
                )}
            </Header>
            <Body>
                <EditContent
                    id={id}
                    content={content}
                    isCompeleted={isCompeleted}
                    isEdit={isEdit}
                    ToggleEdit={ToggleEdit}
                    isorder={isorder}
                />
            </Body>
            {footer}
        </ItemWrapper>
    );
}
function Tomato({ id, tomatoNum, isCompeleted }) {
    return (
        <TomatoConatiner isCompeleted={isCompeleted}>
            {Array.from({ length: 5 }).map((e, i) => {
                if (i < tomatoNum) return <TomatoSlot key={id + i} $fill />;
                return <TomatoSlot key={id + i} />;
            })}
        </TomatoConatiner>
    );
}
const MIN_TEXTAREA_HEIGHT = 32;
/**
 * 內容 todo
 */
function EditContent({
    id,
    content,
    isCompeleted,
    isEdit,
    ToggleEdit,
    isorder,
}) {
    const dispatch = useDispatch();
    const [editcontent, seteditcontent] = useState(content);
    const heightref = useRef();
    /**
     * 在渲染之前就改變，這樣才不會剪下編輯時造成一堆空白
     */
    useLayoutEffect(() => {
        heightref.current.style.height = "inherit";
        heightref.current.style.height = `${Math.max(
            heightref.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [editcontent]);

    if (isCompeleted) {
        return (
            <Content
                readOnly={!isEdit}
                $isEdit={isEdit}
                ref={heightref}
                defaultValue={content}
            />
        );
    }

    const handleDoubleClickEdit = () => {
        if (isorder) return;
        ToggleEdit();
        dispatch(editingTodo(id));
        seteditcontent(content);
    };

    return (
        <Content
            readOnly={!isEdit}
            $isEdit={isEdit}
            ref={heightref}
            autoFocus={isEdit}
            onChange={(e) => {
                seteditcontent(e.target.value);
            }}
            onDoubleClick={handleDoubleClickEdit}
            onBlur={() => {
                // Bug : 這裡會有問題，如果是 0 就不行，要改
                if (editcontent) {
                    dispatch(updateTodoContent(id, editcontent));
                } else {
                    dispatch(editingTodo());
                    alert("任務不能為空白!");
                }
                ToggleEdit();
            }}
            defaultValue={content}
        />
    );
}

/**
 * 排除 cacheTime，避免計時時 Todo 都重新渲染
 */
const selectorTimerExceptCacheTime = createSelector(selectorTimer, (timer) => {
    return Object.keys(timer)
        .filter((key) => !key.includes("cachecurrentTime"))
        .reduce((obj, key) => {
            obj[key] = timer[key];
            return obj;
        }, {});
});

function TodoFooter({ id, tomatoNum, renderTomatoCount, isorder }) {
    const timer = useSelector(selectorTimerExceptCacheTime);
    const dispatch = useDispatch();
    const handlePlay = () => {
        dispatch(initializeTimer(id, tomatoNum));
    };
    const handleDelete = () => {
        dispatch(cleanTaskTodo(id));
    };

    return (
        <Footer $active={timer.currentOnTaskId === id}>
            {renderTomatoCount}
            {!isorder && <Delete onClick={handleDelete} />}
            {!isorder && timer.currentOnTaskId === id && timer.timerstatus && (
                <Pause />
            )}
            {!isorder && timer.currentOnTaskId === id && !timer.timerstatus && (
                <Start />
            )}
            {!isorder && timer.currentOnTaskId !== id && (
                <Start onClick={handlePlay} />
            )}
        </Footer>
    );
}

export default Todo;
