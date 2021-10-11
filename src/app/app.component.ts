import { Component } from '@angular/core';
import { ICity } from './models/ICity';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public citySelectedEvent: ICity | undefined;

  selectedCityEvent(event: ICity){
    this.citySelectedEvent = event;
  }


}
