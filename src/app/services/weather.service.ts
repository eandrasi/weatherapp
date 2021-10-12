import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { tap, map, catchError } from 'rxjs/operators';
import { ICity } from '../models/ICity';
import { IWeatherData } from '../models/IWeatherData';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '7f3ea963675aed9a74e3bdcdda25c21c';

  constructor(private http: HttpClient) { }

  getCurrentWeather(lat: number, lon: number): Observable<any> {
    let url = 'https://api.openweathermap.org/data/2.5/weather';

    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', 'metric')
    .set('appid', this.apiKey)

    return this.http.get(url, {params})
      .pipe(map(data => {
        return this.parseWeatherToIWeatherData(data);
      }),
      catchError(error => {
        return throwError(error);
      }))
  }

  //TODO: don't forget to cath it
  getForecast(lat: number, lon:number): Observable<any> {
    let url = 'https://api.openweathermap.org/data/2.5/forecast';
    let params = new HttpParams()
    .set('lat', lat)
    .set('lon', lon)
    .set('units', 'metric')
    .set('appid', this.apiKey)

    return this.http.get(url, {params})
      .pipe(map(data => {
        return this.chartDataBuilder(data);
      }),
      catchError(error =>{
        return throwError(error);
      }))
  }

  parseWeatherToIWeatherData(data: any): IWeatherData {
    let response: IWeatherData = {
      id: data.weather[0].id,
      main: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      wind: data.wind.speed,
      clouds: data.clouds.all,
      dt: data.dt,
      timezone: data.timezone,
      cod: data.cod,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset
    }

    return response;
  }

  chartDataBuilder(data: any): Array<any>{
    let [...list] = (data as any).list;
    let chartValues: { value: number; name: string; }[] = [];
    let chartData = []

    for(let i = 0; i < list.length ; i += 4){
      chartValues.push({
        value: list[i].main.temp,
        name: new Date(list[i].dt_txt).toLocaleDateString('en-US', {weekday: 'short', hour: '2-digit'})
      })
    }

    let temps = {
      name: "temp",
      series: chartValues
    }
    chartData.push(temps)

    return chartData
  }
}
