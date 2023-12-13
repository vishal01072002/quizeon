import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./reducer/index"
import { configureStore } from "@reduxjs/toolkit";

// fetch store
const store = configureStore({
    reducer: rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
        <ToastContainer/>
    </BrowserRouter>);
