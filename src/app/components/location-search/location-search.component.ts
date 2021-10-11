import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { map, startWith, debounceTime, tap, switchMap, } from 'rxjs/operators';
import { ICity } from 'src/app/models/ICity';
// import { ILocationSuggestion } from 'src/app/models/ILocationSuggestion';
// import { ICoordinates } from 'src/app/models/ICoordinates';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.css']
})
export class LocationSearchComponent implements OnInit {
  formControl = new FormControl();
  options: any;
  // city = <ICity>{};

  @Output() selectedCity = new EventEmitter<ICity>();

  constructor(private locationService: LocationService) { }

  ngOnInit(): void {
    this.formControl.valueChanges.pipe(
      debounceTime(200),
      tap(() => {
        this.options = []
      }), switchMap(
        value => this.locationService.getCitySuggestion(value)
      )
    ).subscribe(data => {
      let count = data.count
      for(let i = 0; i < count && i < 3; i++){
        this.options.push({
          name: data._embedded['city:search-results'][i].matching_full_name,
          href: data._embedded['city:search-results'][i]._links['city:item'].href
        })
      }
    })
  }

  public onSelectedOption(option: any): void {

    this.formControl.setValue('')


    this.locationService.getCityCoordinates(option.href).subscribe(data => {
      let city = <ICity>{};

      city.lat=data.location.latlon.latitude
      city.lon=data.location.latlon.longitude
      city.name=option.name.split(',')[0]
      city.href=option.href

      this.selectedCity.emit(city)
    })
  }
}
