/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-04 00:08:35
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:24:26
 */
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ToastNotification from "./components/ToastNotification";
import {AuthProvider} from "./context/AuthProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
            <ToastNotification />
        </AuthProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
