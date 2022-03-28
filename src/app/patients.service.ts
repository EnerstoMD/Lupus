import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { PersonalInfo } from './models/patientfile.models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  url = environment.patapiUrl
  constructor(private http: HttpClient) { }
  opts = []

  searchPatient(name:string): Observable<PersonalInfo[]>{
    let hp = new HttpParams
    hp=hp.append("name",name)

    if (name == null){
      return this.http.get<PersonalInfo[]>(this.url+"/patients")
    }
    return this.http.get<PersonalInfo[]>(this.url+"/patients/search",{params:hp})
  }

  addPatient(patient:string){
    return this.http.post(this.url,patient)
  } 
  
  findPatientById(id:string): Observable<PersonalInfo>{
    return this.http.get<PersonalInfo>(this.url+"/patients/"+id)
  }

}
