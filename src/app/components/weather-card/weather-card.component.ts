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
      this.city = currentCity.currentValue;

      this.weatherService.getCurrentWeather(currentCity.currentValue.lat, currentCity.currentValue.lon)
        // .pipe(tap(console.log))
        .subscribe(data => this.currentWeather = data)
    }
  }

  //TODO: implement this instead of creating new object
  // ngDoCheck(){}

}
