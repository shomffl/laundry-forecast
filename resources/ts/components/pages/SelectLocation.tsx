import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectLocation = () => {
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/locations/get")
            .then((res) => console.log(res.data.locations_data));
    });
    return <div>SelectLocation</div>;
};

export default SelectLocation;
