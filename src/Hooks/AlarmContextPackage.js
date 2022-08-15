import { createContext, useContext, useMemo, useState } from "react";

const Context = createContext(null);
Context.displayName = "AlarmContext";

function AlarmProvider({ children }) {
    const [currentPlay, setCurrentPlay] = useState(null);
    const value = useMemo(() => {
        return { currentPlay };
    }, [currentPlay]);
    return <Context.Provider>{children}</Context.Provider>;
}

// 要傳遞的有什麼 ? current 對吧

function useAudio() {}
