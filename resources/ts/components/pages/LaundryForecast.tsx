import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const LaundryForecast = () => {
    const [forecastData, setForecastData] = useState<any[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [modalNum, setModalNum] = useState<any>(0);

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "40vw",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        borderRadius: 2,
        p: 4,
    };

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
    console.log("modalNum", modalNum);
    console.log(openModal);
    console.log("data", forecastData[modalNum]);
    return (
        <>
            <Grid container spacing={2}>
                {Object.values(forecastData).map((data: any, key: any) => (
                    <Grid item md={3} key={key}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="h4"
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    {data["日付"]}
                                </Typography>
                                <Typography style={{ textAlign: "center" }}>
                                    <img src={data["天気"]["画像"]} />
                                </Typography>
                                <Typography
                                    variant="h6"
                                    style={{ textAlign: "center" }}
                                >
                                    {data["天気"]["概要"]}
                                </Typography>
                                <Typography style={{ textAlign: "center" }}>
                                    {data["おすすめ度"]["コメント"]}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <button
                                    onClick={(e) => {
                                        setOpenModal(!openModal),
                                            setModalNum(key);
                                    }}
                                >
                                    Learn More
                                </button>
                            </CardActions>
                            <Modal
                                open={openModal}
                                onClose={(e) => setOpenModal(!openModal)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <Typography
                                        id="modal-modal-title"
                                        variant="h4"
                                    >
                                        天気 :
                                        {forecastData[modalNum]["天気"]["詳細"]}
                                    </Typography>
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ fontSize: 20 }}
                                    >
                                        {
                                            forecastData[modalNum]["天気"][
                                                "外干しの可否"
                                            ]
                                        }
                                    </Typography>
                                    <br />
                                    <Typography
                                        id="modal-modal-description"
                                        sx={{ fontSize: 24 }}
                                    >
                                        気温 : {forecastData[modalNum]["気温"]}℃
                                    </Typography>
                                    <Typography sx={{ fontSize: 24 }}>
                                        湿度 : {forecastData[modalNum]["湿度"]}%
                                    </Typography>
                                    <Typography sx={{ fontSize: 24 }}>
                                        風 :
                                        {
                                            forecastData[modalNum]["風"][
                                                "風の状態"
                                            ]
                                        }
                                    </Typography>
                                </Box>
                            </Modal>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default LaundryForecast;
