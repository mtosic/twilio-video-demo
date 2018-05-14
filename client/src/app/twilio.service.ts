import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class TwilioService {


  private serverUrl = 'http://localhost:3000';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }


  /** GET hero by id. Will 404 if id not found */
  getToken(username: string): Observable<TwilioToken> {
    const url = `${this.serverUrl}/token/${username}`;
    return this.http.get<TwilioToken>(url).pipe(
      tap(_ => console.log(`fetched token for: ${username}`)),
      catchError(this.handleError<TwilioToken>(`getToken username=${username}`))
    );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
