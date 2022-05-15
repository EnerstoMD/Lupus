import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import { Observable, throwError} from 'rxjs';
import { PersonalInfo } from '../models/patientfile.models';
import { environment } from 'src/environments/environment';
import { PageEvent } from '@angular/material/paginator';


@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  url = environment.patapiUrl
  constructor(private http: HttpClient) { }
  opts = []

  //Limited to 5 patients
  searchPatient(name:string): Observable<PersonalInfo[]>{
    let hp = new HttpParams
    hp=hp.append("name",name)
    hp=hp.append("limit","5")
    return this.http.get<PersonalInfo[]>(this.url+"/patient/search",{params:hp})
  }

  countSearchedPatients(name:string): Observable<number>{
    let hp = new HttpParams
    hp=hp.append("name",name)
    return this.http.get<number>(this.url+"/patient/search/count",{params:hp})
  }

  searchPatientByName(name:string,event:PageEvent): Observable<PersonalInfo[]>{
    let hp = new HttpParams
    let page = 1
    hp=hp.append("name",name)
    // hp=hp.append("page",(event.pageIndex+1).toString())
    if (event.pageSize!=null&&event.pageSize!=undefined) {
      hp=hp.append("limit",event.pageSize.toString())
      if (event.pageIndex!=null&&event.pageIndex!=undefined){
        hp=hp.append("page",(event.pageIndex+1).toString())
      }
    }
    return this.http.get<PersonalInfo[]>(this.url+"/patient/search",{params:hp})
  }

  addPatient(patient:string){
    return this.http.post(this.url+"/patient",patient)
  }
  updatePatientInfos(id:string,patientInfos:PersonalInfo){
    return this.http.patch(this.url+"/patient/"+id,patientInfos)
  }
  
  findPatientById(id:string): Observable<PersonalInfo>{
    return this.http.get<PersonalInfo>(this.url+"/patient/"+id)
  }

}
