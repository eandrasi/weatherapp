import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ICity } from 'src/app/models/ICity';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  temps: any[] | undefined;

  @Input() selectedCity: ICity | undefined;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    const currentCity: SimpleChange = changes.selectedCity;

    if(currentCity.currentValue){
      this.weatherService.getForecast(currentCity.currentValue.lat, currentCity.currentValue.lon)
      // .pipe(tap(console.log))
      .subscribe(data => this.temps = data)
    }
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
