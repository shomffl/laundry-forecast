import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";

const SelectLocation = () => {
    const [locations, setLocations] = useState<string[]>([]);
    const [sendLocations, setSendLocations] = useState<string[]>([]);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        axios.get("locations/get").then((res) => {
            setLocations(res.data.locations_data);
        });
    }, []);

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

    const onClickSendLocations = () => {
        const data = {
            locations: sendLocations,
        };
        axios.post("locations/store", data).then((res: any) => {
            console.log(res.data.comment);
            navigate("/laundry-forecast");
        });
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
                                    value={data["id"]}
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
            <button onClick={onClickSendLocations}>send</button>
        </>
    );
};

export default SelectLocation;
