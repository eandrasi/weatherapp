import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { tap, map, catchError } from 'rxjs/operators';
import { ICity } from '../models/ICity';

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
        return this.chartDataBuilder(data)
      }),
      catchError(error =>{
        return throwError(error)
      }))
  }

  chartDataBuilder(data: any): Array<any>{
    let [...list] = (data as any).list;
    let chartValues: { value: number; name: string; }[] = [];
    let chartData = []

    // console.log(list.length)

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
