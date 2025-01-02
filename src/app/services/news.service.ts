import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpClient: HttpClient) { }
  private countrySubject = new BehaviorSubject<string>('');
  countryName$: Observable<string> = this.countrySubject.asObservable();

  refreshCountryName(name: string): void{
    console.log('Country Name: '+name);
    this.countrySubject.next(name);
  }

  getNewsByCountry(search: string): Observable<any>{
    let result: Observable<any>;
    return this.countryName$.pipe(
      switchMap((countryName) => {
        if (!countryName.trim()) {
          return [];
        }
        if(search){
          result = this.httpClient.get(`${environment.newsApiUrl}${countryName} AND ${search}&apiKey=${environment.newsApiKey}`);
        }else{
          result = this.httpClient.get(`${environment.newsApiUrl}${countryName}&apiKey=${environment.newsApiKey}`);
        }
        return result;
      })
    );
  }
}
