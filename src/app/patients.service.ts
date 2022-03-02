import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { PersonalInfo } from './models/patientfile.models';



@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  url = 'http://localhost:4545/patients/search'
  constructor(private http: HttpClient) { }
  opts = []

  searchPatient(name:string): Observable<PersonalInfo[]>{
    let hp = new HttpParams
    hp=hp.append("name",name)
    return this.http.get<PersonalInfo[]>(this.url,{params:hp})
  }
  // private extractData(res:any){
  //   let body = res
  //   return body
  // }
  // private handleErrorObservable(error: any) {
  //   console.error(error.message || error);
  //   return throwError(error);
  // }
}
