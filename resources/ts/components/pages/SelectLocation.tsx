import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectLocation = () => {
    const [locations, setLocations] = useState<string[]>([]);
    const navigate = useNavigate();
    const data_list = ["札幌", "函館", "横浜", "相模原", "八千代", "大阪"];

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/locations/get").then((res) => {
            setLocations(res.data.locations_data);
        });
    }, []);

    console.log(locations);

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        {Object.values(locations).map((data: any, key: any) => (
                            <td key={key}>{data["name"]}</td>
                        ))}
                    </tr>
                    <tr>
                        {Object.values(locations).map((data: any, key: any) => (
                            <td key={key}>
                                <input
                                    type="checkbox"
                                    value={data["name"]}
                                    onChange={(e) =>
                                        console.log(e.target.value)
                                    }
                                />
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default SelectLocation;
