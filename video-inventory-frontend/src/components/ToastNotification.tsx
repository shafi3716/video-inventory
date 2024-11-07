/**
 * @Author: Abdullah Al Shafi
 * @Date:   2024-11-05 12:04:50
 * @Last Modified by:   Abdullah Al Shafi
 * @Last Modified time: 2024-11-07 17:23:56
 */
import {Toaster} from "react-hot-toast";

const ToastNotification = () => (
    <Toaster
        position='top-right'
        toastOptions={{
            className: "",
            style: {
                background: "#333",
                color: "#fff",
            },
            success: {
                style: {
                    background: "#4caf50",
                    color: "#fff",
                },
            },
            error: {
                style: {
                    background: "#f44336",
                    color: "#fff",
                },
            },
        }}
    />
);

export default ToastNotification;
