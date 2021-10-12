import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ICity } from 'src/app/models/ICity';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  city: ICity | undefined

  @Input() selectedCity: ICity | undefined;
  @Output() mapPosition = new EventEmitter<ICity>();

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap



  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    zoom: 10,
    mapTypeId: 'terrain',
    center: {lat: 52.5244, lng: 13.4105}
  }

  marker = {
    position: { lat: 49.9594, lng: 9.7650 },
    options: { animation: google.maps.Animation.DROP },
 }

  constructor() { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.centerMap(position.coords.latitude, position.coords.longitude);
      this.emitMapPosition(position.coords.latitude, position.coords.longitude);
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const currentCity: SimpleChange = changes.selectedCity;
    if(currentCity.currentValue){
      this.city = currentCity.currentValue;
      if(this.city && this.city.lat && this.city.lon){
        this.centerMap(this.city.lat, this.city.lon)
      }
    }
  }

  click(event: google.maps.MapMouseEvent) {
    this.centerMap(event.latLng.lat(), event.latLng.lng());
    this.emitMapPosition(event.latLng.lat(), event.latLng.lng())
  }

  centerMap(lat: number, lng: number) {
    this.map.panTo({lat, lng});
    this.marker.position = {lat, lng}
  }

  emitMapPosition(lat: number, lng: number) {
    let mapPosition = <ICity>{
      lat: lat,
      lon: lng,
      name: Number(lat).toFixed(3) + " - " + Number(lng).toFixed(3),
      href: ""
    }

    this.mapPosition.emit(mapPosition);
  }

}
