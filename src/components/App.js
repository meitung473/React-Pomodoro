import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "@constants/globalStyle";
import { theme } from "@constants/theme";

import { TodoPage, AlarmPage, AnalysisPage } from "@pages";
import Timer from "@pages/Timer";
import { Header } from "../Layout";
import { useAudio } from "@Hooks/useAudio";
import AudioController from "./Audio/AudioController";

const defaulttheme = theme;

function App() {
    const { audiocontrollers, setCurrentPlay, setTimesupPlay } = useAudio();

    return (
        <ThemeProvider theme={defaulttheme}>
            <GlobalStyle />
            <HashRouter>
                <Header />
                <Routes>
                    <Route path="/" element={null} />
                    <Route path="task" element={<TodoPage />} />
                    <Route
                        path="alarm"
                        element={
                            <AlarmPage
                                setCurrentPlay={setCurrentPlay}
                                setTimesupPlay={setTimesupPlay}
                            />
                        }
                    />
                    <Route path="analysis" element={<AnalysisPage />} />
                </Routes>
                <Timer
                    setCurrentPlay={setCurrentPlay}
                    setTimesupPlay={setTimesupPlay}
                />
                <AudioController refs={audiocontrollers} />
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
