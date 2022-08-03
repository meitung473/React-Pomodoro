import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { GlobalStyle } from "@constants/globalStyle";
import { theme } from "@constants/theme";

import { Timer, Header } from ".";
import { TodoPage, AlarmPage, AnalysisPage } from "@pages";

const defaulttheme = theme;

function App() {
    return (
        <ThemeProvider theme={defaulttheme}>
            <GlobalStyle />
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
        </ThemeProvider>
    );
}

export default App;
