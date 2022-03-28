import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
   })
export class CalendarService {
    url = environment.patapiUrl
    constructor(private http:HttpClient){}

    fetchAllEvents():Observable<Event[]>{
        return this.http.get<Event[]>(this.url+"/calendar")
    }
}