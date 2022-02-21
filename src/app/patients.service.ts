import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {PatientFile,PersonalInfo,PatientDisease,PatientTreatment} from './models/patientfile.models'

export interface SearchResult {
  name:string,
  uid:number
}

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  patientResults = require('../../devdata/patientlist.json')

  rickInfos: PersonalInfo[] = require('../../devdata/patientx-infos.json');
  rickDiseases : PatientDisease[] = require('../../devdata/patientx-diseases.json')
  rickTreatments : PatientTreatment[] = require('../../devdata/patientx-treatments.json')
  rickPatientFile : PatientFile = {
    "uid":1,
    "infos":this.rickInfos[0],
    "diseases":this.rickDiseases,
    "treatments":this.rickTreatments
  }
  mortyInfos : PersonalInfo = require('../../devdata/patient2.json')
  mortyPatientFile : PatientFile = {
    "uid":2,
    "infos":this.mortyInfos,
    "diseases":this.rickDiseases,
    "treatments":this.rickTreatments
  }
  allPatientDB : PatientFile[] = require('../../devdata/allPatientDB.json')
  
  constructor(private http: HttpClient) {
    console.log("patientres:",this.allPatientDB)
  }
  
  getPatients(): SearchResult[] {
    return   this.patientResults
  }

  getPatientByUid(uid:number): PatientFile {
    return this.rickPatientFile;
  }
}
