export type Mission = {
  id: String;
  title: String;
  operator: String;
  launch: Launch;
  orbit: Orbit;
  payload: Payload;
}

export type Launch = {
  date: Date;
  vehicle: String;
  location: Location;
}

export type Location = {
  name: String;
  longitude: Number;
  Latitude: Number;
}

export type Orbit = {
  periapsis: Number;
  apoapsis: Number;
  inclination: Number;
}

export type Payload = {
  capacity: Number;
  available: Number;
}

export type Condition = {
  text:string
  icon:string 
}

export type Day = {
  maxtemp_c:Number;
  mintemp_c:Number;
  avgtemp_c:Number;
  condition: Condition
} 

export type Forecastday = {
  date:Date
  day:Day
}

export type Forecast = {
  forecastday:Array<Forecastday>
}

export type Weather ={
  location: Location
  forecast:Forecast
}