import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private url = 'https://api.teleport.org/api/cities/?search=';

  constructor(private http: HttpClient) {}

  getCitySuggestion(city: string): Observable<any>{
    return this.http.get(this.url + city)
  }

  getCityCoordinates(href: string): Observable<any>{
    return this.http.get(href)
  }

}
