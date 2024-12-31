import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestCountriesService {

  constructor(private httpClient: HttpClient) { }
  country:any;

  getCountryByName(name:string){
    this.country = this.httpClient.get(`${environment.restCountriesApi}${name}`);
    return this.country;
  }
  getAllCountries():Observable<any[]>{
    return this.httpClient.get<any[]>(`${environment.restCountriesApi}all`);
  }
}
