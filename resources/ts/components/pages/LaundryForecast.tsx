import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

const LaundryForecast = () => {
    const navigate: NavigateFunction = useNavigate();
    useEffect(() => {
        axios.get("/user/get").then((res) => console.log(res.data));
    }, []);

    return <div>LaundryForecast</div>;
};

export default LaundryForecast;
