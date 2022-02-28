import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SelectLocation = () => {
    const [locations, setLocations] = useState<string[]>([]);
    const [sendLocations, setSendLocations] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/locations/get").then((res) => {
            setLocations(res.data.locations_data);
        });
    }, []);
    console.log(sendLocations);

    const checkLocationsData = (data: string) => {
        const indexNum = sendLocations.indexOf(data);
        if (sendLocations.includes(data)) {
            const copyArray = [...sendLocations];
            copyArray.splice(indexNum, 1);
            setSendLocations(copyArray);
        } else {
            setSendLocations([...sendLocations, data]);
        }
    };

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
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        checkLocationsData(e.target.value);
                                    }}
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
