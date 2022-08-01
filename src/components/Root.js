import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import PropTypes from "prop-types";

const Root = ({ store }) => (
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

export default Root;

Root.propTypes = {
    store: PropTypes.object,
};
