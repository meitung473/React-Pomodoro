import React from "react";
import { createRoot } from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import configStore from "./redux/store";
import Root from "./components/Root";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const store = configStore();
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Root store={store} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

serviceWorkerRegistration.register();
