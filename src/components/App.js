import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { Timer, Modal, Header } from ".";
import { modalComponent } from "@components/Modal/ModalType";
import { TodoPage, AlarmPage, AnalysisPage } from "@pages";

import useClock from "@Hooks/useClock";
import useModal from "@Hooks/useModal";

import { ModalContext, TimerContext } from "@constants/context";
import { GlobalStyle } from "@constants/globalStyle";
import { theme } from "@constants/theme";

function App() {
    const {
        currenttime,
        setCurrentTime,
        currentLine,
        setCurrentLine,
        nextRound,
        initialTimer,
    } = useClock();

    // const { openModal, closeModal, modalName, EventModal, show } = useModal();

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <TimerContext.Provider
                value={{
                    currenttime,
                    setCurrentTime,
                    currentLine,
                    setCurrentLine,
                    initialTimer,
                    nextRound,
                }}
            >
                <HashRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={null} />
                        <Route path="task" element={<TodoPage />} />
                        <Route path="alarm" element={<AlarmPage />} />
                        <Route path="analysis" element={<AnalysisPage />} />
                    </Routes>
                    <Timer />
                </HashRouter>
            </TimerContext.Provider>
        </ThemeProvider>
    );
}

export default App;
