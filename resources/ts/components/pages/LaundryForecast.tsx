import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

const LaundryForecast = () => {
    const navigate: NavigateFunction = useNavigate();
    useEffect(() => {
        axios.get("/");
    }, []);

    return <div>LaundryForecast</div>;
};

export default LaundryForecast;
