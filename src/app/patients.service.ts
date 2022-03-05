import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { PersonalInfo } from './models/patientfile.models';



@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  url = 'http://localhost:4545/patients'
  constructor(private http: HttpClient) { }
  opts = []

  searchPatient(name:string): Observable<PersonalInfo[]>{
    let hp = new HttpParams
    hp=hp.append("name",name)

    if (name == null){
      return this.http.get<PersonalInfo[]>(this.url)
    }
    return this.http.get<PersonalInfo[]>(this.url+"/search",{params:hp})
  }

  addPatient(patient:string){
    return this.http.post(this.url,patient)
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
