import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ICity } from 'src/app/models/ICity';
import { IWeatherData } from 'src/app/models/IWeatherData';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnChanges/* , DoCheck */{
  currentWeather: IWeatherData | undefined;
  city: ICity | undefined

  @Input() selectedCity: ICity | undefined;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    const currentCity: SimpleChange = changes.selectedCity;
    if(currentCity.currentValue){
      // console.log(currentCity.currentValue)
      this.city = currentCity.currentValue;

      this.weatherService.getCurrentWeather(currentCity.currentValue.lat, currentCity.currentValue.lon)
        // .pipe(tap(console.log))
        .subscribe(data => this.currentWeather = {
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
        })
    }
  }

  //TODO: implement this instead of creating new object
  // ngDoCheck(){}

}
