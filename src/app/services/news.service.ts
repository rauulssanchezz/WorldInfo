import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, switchMap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(private httpClient: HttpClient) { }
  private countrySubject = new BehaviorSubject<string>('');
  countryName$: Observable<string> = this.countrySubject.asObservable();
  requestLimitSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  refreshCountryName(name: string): void{
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
          result = this.httpClient.get(`https://newsapi.org/v2/everything?q=${countryName} AND ${search}&apiKey=${environment.newsApiKey}`)
            .pipe(
              catchError((error) => {
                console.error('Error:', error);
                if(error.status === 429){
                  this.requestLimitSubject.next(true);
                  return throwError(() => 'Api limit reached. Please try again tomorrow😞.');
                }
                return throwError(() => 'An error occurred. Please try again later😞.');
              })
            );
        }else{
          result = this.httpClient.get(`https://newsapi.org/v2/everything?q=${countryName}&apiKey=${environment.newsApiKey}`).pipe(
            catchError((error) => {
              console.error('Error:', error);
              if(error.status === 429){
                this.requestLimitSubject.next(true);
                return throwError(() => 'Api limit reached. Please try again tomorrow😞.');
              }
              return throwError(() => 'An error occurred. Please try again later😞.');
            })
          );;
        }
        return result;
      })
    );
  }
}
