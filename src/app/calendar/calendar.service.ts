import { HttpClient, HttpHeaderResponse } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { catchError, Observable, retry,throwError } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
   })
export class CalendarService {
    url = environment.patapiUrl
    constructor(private http:HttpClient){}

    fetchAllEvents():Observable<Event[]>{
        return this.http.get<Event[]>(this.url+"/calendar").pipe(retry(1),catchError(this.handleError))
    }
    confirmEvent(id:string){
       return this.http.patch(this.url+"/calendar/"+id+"/confirm",{}).pipe(
            retry(1),catchError(this.handleError))
    }
    unconfirmEvent(id:string){
        return this.http.patch(this.url+"/calendar/"+id+"/unconfirm",{}).pipe(
            retry(1),catchError(this.handleError))
    }

    createEvent(event:string):Observable<Event>{
        return this.http.post<Event>(this.url+"/calendar",event).pipe(
            retry(1),catchError(this.handleError))
    }

    deleteEvent(id:string){
        return this.http.delete(this.url+"/calendar/"+id).pipe(
            retry(1),catchError(this.handleError))
    }

    private handleError(error: HttpHeaderResponse | any) {
        let errMsg: string;
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errMsg = error.error.message;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errMsg = `Backend returned code ${error.status}, ` + `body was: ${error.error}`;
        }
        console.error(errMsg);
        window.alert(errMsg);
        return throwError(errMsg);
      }
}