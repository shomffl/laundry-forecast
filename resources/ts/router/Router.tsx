import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SelectLocation from "../components/pages/SelectLocation";
import LaundryForecast from "../components/pages/LaundryForecast";

const Router: React.VFC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LaundryForecast />} />
                <Route path="/select" element={<SelectLocation />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;

if (document.getElementById("root")) {
    ReactDOM.render(<Router />, document.getElementById("root"));
}
