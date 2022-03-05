import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";

const LaundryForecast = () => {
    const [forecastData, setForecastData] = useState<string[]>([]);
    const navigate: NavigateFunction = useNavigate();
    useEffect(() => {
        axios.get("/user/get").then((res: AxiosResponse<any>) => {
            axios
                .post("/weather/get", {
                    location_name_id: res.data.locations_data[0]["name_id"],
                })
                .then((res: AxiosResponse<any>) =>
                    setForecastData(res.data.weather_data)
                );
        });
    }, []);
    console.log(forecastData);

    return (
        <>
            <Grid container spacing={2}>
                {Object.values(forecastData).map((data: any, key: any) => (
                    <Grid item md={3} key={key}>
                        <Card>
                            <CardHeader title={data["日付"]}></CardHeader>
                            <CardContent>
                                <Typography>{data["天気"]["概要"]}</Typography>
                                <Typography>
                                    {data["天気"]["外干しの可否"]}
                                </Typography>
                                <Typography>
                                    <img src={data["天気"]["画像"]} />
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <button>Learn More</button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default LaundryForecast;
