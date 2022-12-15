import { Alert, Container, Snackbar } from "@mui/material";
import { AppLayout } from "../layouts/AppLayout";
import { Forecastday, Weather as WeatherType} from "../graphql/schema";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import React from "react";

const Weather = (): JSX.Element => {
  const [city,setCity] = useState<string>("Jerusalem");
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [weathers, setWeathers] = useState<WeatherType | null>();
  let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Sabbath']; 
    
  const handleErrClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") return;
    setErrMessage(null);
  };

  useEffect(() => {
      fetch(`http://api.weatherapi.com/v1/forecast.json?key=9d6802e26abe49c1944162301220512&q=${city}&days=5&aqi=yes&alerts=no`)
        .then((response) => response.json())
        .then((data)=> setWeathers(data))
        .catch((err) => {
        setErrMessage("Failed to load Weathers.");
        console.log(err);
       });
  },[city, weathers]);


  return (
    <AppLayout title="Weather">
      <Container maxWidth="lg">    
        <Typography variant="h4" component="h1">
          {"Weather Forecast- "}{city} {" City"}
        </Typography>  
        {weathers ? (
          <Grid container spacing={2}>
            {weathers.forecast.forecastday.map((forecastday: Forecastday, key: number) => !forecastday?null:(
              <Grid item key={key}>
                <Card sx={{ width: 275, height: 280, textAlign: "center"}}>
                  <CardHeader
                    title={days[new Date(forecastday.date).getDay()]}
                    subheader={new Date(forecastday.date).toDateString().substring(4)}
                  />
                  <CardContent>
                    <Typography noWrap>
                      <img alt="weatheIcon" src={forecastday.day.condition.icon} />
                      <br/>
                      </Typography>
                     <Typography noWrap>
                     <React.Fragment>
                        { Number(forecastday.day.mintemp_c) } 
                        - { Number(forecastday.day.maxtemp_c) }
                      </React.Fragment>
                    </Typography>
                    <Typography noWrap>
                      <br/>
                        <b>{forecastday.day.condition.text}</b>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Box>
        )}
      </Container>
      <Snackbar
        open={errMessage != null}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleErrClose}
      >
        <Alert onClose={handleErrClose} variant="filled" severity="error">
          {errMessage}
        </Alert>
      </Snackbar>
    </AppLayout>
  );
};

export { Weather };
