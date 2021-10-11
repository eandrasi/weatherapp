export interface IWeatherData {
  id: number;
  main: string;
  description: string;
  icon: string;
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  wind: number;
  clouds: number;
  dt: number;
  timezone: number;
  cod: number;
  sunrise: number;
  sunset: number;
  dt_txt?: string;
}
